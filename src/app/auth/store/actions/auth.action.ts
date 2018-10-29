import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGOUT = '[Auth] Logout',
  LOGOUT_CONFIRMATION = '[Auth] Logout Confirmation',
  LOGOUT_CONFIRMATION_DISMISS = '[Auth] Logout Confirmation Dismiss',
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutConfirmation implements Action {
  readonly type = AuthActionTypes.LOGOUT_CONFIRMATION;
}

export class LogoutConfirmationDismiss implements Action {
  readonly type = AuthActionTypes.LOGOUT_CONFIRMATION_DISMISS;
}

export type AuthActionsUnion =
  | Logout
  | LogoutConfirmation
  | LogoutConfirmationDismiss;
