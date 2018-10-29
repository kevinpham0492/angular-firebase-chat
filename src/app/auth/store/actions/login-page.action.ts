import { Action } from '@ngrx/store';
import { Credential } from '../../models';

export enum LoginPageActionTypes {
  LOGIN = '[Login Page] Login',
  LOGIN_WITH_GOOGLE = '[Login Page] Login with google',
  LOGIN_WITH_FACEBOOK = '[Login Page] Login with facebook'
}

export class Login implements Action {
  readonly type = LoginPageActionTypes.LOGIN;

  constructor(public payload: { credential: Credential }) {}
}

export class LoginWithGoogle implements Action {
  readonly type = LoginPageActionTypes.LOGIN_WITH_GOOGLE;
}

export class LoginWithFacebook implements Action {
  readonly type = LoginPageActionTypes.LOGIN_WITH_FACEBOOK;
}

export type LoginPageActionsUnion = Login | LoginWithGoogle | LoginWithFacebook;
