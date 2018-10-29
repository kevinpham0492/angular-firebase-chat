import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firestore } from 'firebase/app';
import { AngularFirestore, DocumentChangeType } from '@angular/fire/firestore';

import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from '@app/auth/services';
import { COLECTIONS } from '../chat.config';

@Injectable()
export class ChatService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) { }

  get(chatId: string) {
    return this.afs
      .collection<any>(COLECTIONS.MESSAGES)
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  getChannelById(channelId: string) {
    return this.afs
      .collection(COLECTIONS.CHATS)
      .doc(channelId)
      .valueChanges()
  }

  getMessagesByChannel(channelId: string): Observable<any> {
    const path = `${COLECTIONS.MESSAGES}/${channelId}/messages`;

    let messagesList;
    const joinKeys = {};

    return this.afs
      .collection(path, ref => {
        return ref
          .orderBy('createdAt')
      })
      .snapshotChanges()
      .pipe(
        map((events: Array<{ type: string, payload: any }>) => {
          if (!events || events.length < 1) {
            return [];
          }
          return events.map(event => {
            const doc = event.payload.doc;
            return { id: doc.id, ...doc.data() }
          });
        }),
        switchMap(messages => {
          // Unique User IDs
          const uids = Array.from(new Set(messages.map(v => v.uid)));

          // Firestore User Doc Reads
          const userDocs = uids.map(u =>
            this.afs.doc(`users/${u}`).valueChanges()
          );

          // const arr = userDocs.length ? combineLatest(userDocs) : of([]);
          messagesList = messages;

          return userDocs.length ? combineLatest(userDocs) : of([]);

        }),
        map(arr => {
          arr.forEach(v => (joinKeys[(<any>v).uid] = v));
          messagesList = messagesList.map(v => {
            return { ...v, user: joinKeys[v.uid] };
          });

          return messagesList;
        })
      )
  }

  getConversations() {
    return this.afs
      .collection<any>(COLECTIONS.CHATS)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  async createChat(title: string) {
    const { uid } = await this.auth.getUser();

    const conversation = {
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      title: title,
      lastMessage: ''
    };

    const docRef = await this.afs.collection(COLECTIONS.CHATS).add(conversation);
    const conversationId = docRef.id;
    await this.afs.collection(COLECTIONS.MESSAGES).doc(conversationId).set({});
    await this.afs.collection(COLECTIONS.MEMBERS).doc(conversationId).set({
      members: [uid],
      admins: [uid]
    });

    this.router.navigate(['chats/', docRef.id]);
  }

  async create() {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    const docRef = await this.afs.collection('chats').add(data);

    return this.router.navigate(['chats', docRef.id]);
  }

  async sendMessage(conversationId, content) {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      createdAt: Date.now(),
      content: content
    };
    await this.afs.collection(`${COLECTIONS.MESSAGES}/${conversationId}/messages`).add(data);
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};

    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));

        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });

        return chat;
      })
    );
  }
}


/*
const users = {
  user1: {
    name: 'User 1 Pham',
    email: 'test@gmail.com'
  },
  user2: {
    name: 'User2 Pham',
    email: 'test2@gmail.com'
  }
}
const chats = {
  chat1: {
    createdAt: 1540110121028,
    lastMessage: "",
    lastUpdated: 1540110121028,
    title: "Demo 1"
  },
  chat2: {
    createdAt: 1540110121028,
    lastMessage: "",
    lastUpdated: 1540110121028,
    title: "Demo 2"
  }
};

const messages = {
  chat1: {
    message1: {
      uid: 'user1',
      content: 'Tin nhan 1',
      createdAt: 1540110121028,
    },
    message2: {
      uid: 'user1',
      content: 'Tin nhan 2',
      createdAt: 1540110121028,
    },
    message3: {
      uid: 'user2',
      content: 'Tin nhan 3',
      createdAt: 1540110121028,
    },
    message4: {
      uid: 'user4',
      content: 'Tin nhan 4',
      createdAt: 1540110121028,
    }
  },
  chat2: {
    message1: {
      uid: 'user1',
      content: 'Tin nhan 1',
      createdAt: 1540110121028,
    },
    message2: {
      uid: 'user1',
      content: 'Tin nhan 2',
      createdAt: 1540110121028,
    },
    message3: {
      uid: 'user2',
      content: 'Tin nhan 3',
      createdAt: 1540110121028,
    },
    message4: {
      uid: 'user1',
      content: 'Tin nhan 4',
      createdAt: 1540110121028,
    }
  }
}

const members = {
  chat1: {
    members: [
      `user1`, `user2`, `user3`
    ],
    admins: [
      `user1`, `user2`
    ]
  },
  chat2: {
    members: [
      `user1`
    ],
    admins: [
      `user1`
    ]
  }
}


*/
