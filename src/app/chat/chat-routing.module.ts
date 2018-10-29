import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPageComponent, ConversationPageComponent, ChatPageComponent } from './containers';
import { AuthenticationGuard } from '@app/auth/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'conversations',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component:
      ContactPageComponent
  },
  {
    path: 'conversations',
    component: ConversationPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'conversations/:conversationId',
    component: ChatPageComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
