import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@app/auth/guards';

const routes: Routes = [
  {
    path: '', redirectTo: 'chats', pathMatch: 'full'
  },
  {
    path: 'chats',
    loadChildren: 'src/app/chat/chat.module#ChatModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
