import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services';
import { ChatService } from '../../services';
import { Store } from '@ngrx/store';
import { State } from '@app/auth/store';
import { AuthActions } from '@app/auth/store/actions';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit {

  index = 0;
  conversations;

  constructor(
    private store: Store<State>,
    private auth: AuthService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.conversations = this.chatService.getConversations();
  }

  createChat() {
    const title = `Chat ${this.index++}`;
    this.chatService.createChat(title);
  }

  onLogout() {
    this.store.dispatch(new AuthActions.LogoutConfirmation());
  }

}
