import { Action } from '@ngrx/store';
import { User } from '../../models';

export enum AuthApiActionTypes {
  LOGIN_SUCCESS = '[Auth/API] Login Success',
  LOGIN_FAILURE = '[Auth/API] Login Failure',
  LOGIN_REDIRECT = '[Auth/API] Login Redirect',
}

export class LoginSuccess implements Action {
  readonly type = AuthApiActionTypes.LOGIN_SUCCESS;

  constructor() {}
}

export class LoginFailure implements Action {
  readonly type = AuthApiActionTypes.LOGIN_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthApiActionTypes.LOGIN_REDIRECT;
}

export type AuthApiActionsUnion = LoginSuccess | LoginFailure | LoginRedirect;
