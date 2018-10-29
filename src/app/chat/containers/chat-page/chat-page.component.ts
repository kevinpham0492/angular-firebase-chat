import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { AuthService } from '@app/auth/services';
import { ChatService } from '../../services';
import { MessageItemComponent } from '../../components';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, AfterViewInit {
  messageText: string;
  replyInput: any;
  loading = false;
  conversationDetail$: Observable<any>;
  messages$: Observable<any>;
  messagesGroup$: Observable<any>;

  user: any;
  @ViewChild('replyInput') replyInputField;
  @ViewChild('replyForm') replyForm: NgForm;
  @ViewChildren(MessageItemComponent) messageElements: QueryList<MessageItemComponent>;

  private conversationId: string;
  private focusedToInput = false;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loading = true;
    this.conversationId = this.route.snapshot.paramMap.get('conversationId');
    this.conversationDetail$ = this.chatService.getChannelById(this.conversationId);
    this.messages$ = this.chatService.getMessagesByChannel(this.conversationId);
    this.messagesGroup$ = this.messages$.pipe(
      map(messages => {
        this.loading = false;
        const groups = _.groupBy(messages, (message) => {
          return message.id;
        });

        return Object.keys(groups).map(key => {
          return groups[key];
        })
      })
    );

    this.authService.getUser()
      .then(user => {
        this.user = user;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.scrollToBottom();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.replyInput = this.replyInputField.nativeElement;
    // this.readyToReply();
    console.log(this.messageElements);
    this.messageElements.changes.subscribe(() => {
      this.scrollToBottom();
    })
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private readyToReply() {
    setTimeout(() => {
      // this.replyForm.reset();
      this.focusReplyInput();
      this.scrollToBottom();
    });

  }

  onFocusToInput() {
    this.focusedToInput = true;
  }

  onBlurInput() {
    this.focusedToInput = false;
  }

  onCopyLinkToConversationClicked() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'https://angularx-fire-chat.firebaseapp.com/chats/conversations/CGILIaonDQOyegunK3tI';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
    });
  }

  private focusReplyInput() {
    setTimeout(() => {
      this.replyInputField.nativeElement.focus();
      this.focusedToInput = true;
    });
  }

  reply() {
    const content = {
      type: 'text',
      message: this.messageText
    }

    this.replyInputField.nativeElement.focus();
    this.chatService.sendMessage(this.conversationId, content);
    this.messageText = '';
    this.focusReplyInput();
    this.scrollToBottom();
  }

  private scrollToBottom() {
    const messagesContainerElement = document.querySelector('.chat-messages');
    messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
  }

}
