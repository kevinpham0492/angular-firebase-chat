import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '@app/auth/services';
import { Credential } from '../../models';
import { State, selectLoginPagePending } from '../../store';
import { LoginPageActions } from '../../store/actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loading$: Observable<boolean> = this.store.pipe(select(selectLoginPagePending));

  constructor(
    private store: Store<State>
  ) {
  }

  ngOnInit() {
  }

  onLoginWithGoogle() {
    this.store.dispatch(new LoginPageActions.LoginWithGoogle());
  }

}
