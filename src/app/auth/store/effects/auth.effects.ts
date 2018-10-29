import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import {
  LoginPageActions,
  AuthActions,
  AuthApiActions,
} from '../actions';
import { Credential } from '../../models';
import { AuthService } from '../../services';
import { LogoutConfirmationDialog } from '../../components';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginPageActions.Login>(LoginPageActions.LoginPageActionTypes.LOGIN),
    map(action => action.payload.credential),
    switchMap((credential: Credential) =>
      this.authService.login(credential).pipe(
        map(() => new AuthApiActions.LoginSuccess()),
        catchError(error => of(new AuthApiActions.LoginFailure({ error })))
      )
    )
  );

  @Effect()
  loginWithGoogle$ = this.actions$.pipe(
    ofType(LoginPageActions.LoginPageActionTypes.LOGIN_WITH_GOOGLE),
    switchMap(() =>
      from(this.authService.signInWithGoogle()).pipe(
        map(() => new AuthApiActions.LoginSuccess()),
        catchError(error => of(new AuthApiActions.LoginFailure({ error })))
      )
    )
  );

  @Effect()
  loginWithFacebook$ = this.actions$.pipe(
    ofType(LoginPageActions.LoginPageActionTypes.LOGIN_WITH_FACEBOOK),
    switchMap(() =>
      from(this.authService.signInWithFacebook()).pipe(
        map(() => new AuthApiActions.LoginSuccess()),
        catchError(error => of(new AuthApiActions.LoginFailure({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.AuthApiActionTypes.LOGIN_SUCCESS),
    tap(() => this.router.navigate(['/chats']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      AuthApiActions.AuthApiActionTypes.LOGIN_REDIRECT,
      AuthActions.AuthActionTypes.LOGOUT
    ),
    tap(() => {
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  logoutConfirmation$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT_CONFIRMATION),
    switchMap(() => {
      const dialogRef = this.dialog.open<
        LogoutConfirmationDialog,
        undefined,
        boolean
        >(LogoutConfirmationDialog);

      return dialogRef.afterClosed();
    }),
    map(result => {
      return result
        ? new AuthActions.Logout()
        : new AuthActions.LogoutConfirmationDismiss();
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }
}
