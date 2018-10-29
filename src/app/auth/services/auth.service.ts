import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import { Credential, User } from '../models';

@Injectable()
export class AuthService {

  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      map(user => {
        return !!user;
      })
    );
  }

  login({ username, password }: Credential): Observable<User> {
    return of({ name: 'User' });
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  signInWithFacebook() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  signInRegular(email, password) {
    const credential = auth.EmailAuthProvider.credential(email, password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName, photoURL }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}
