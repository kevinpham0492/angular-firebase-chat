import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import { AppState } from '@app/core/store';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';
import { AuthApiActions } from '../actions';
import { CONFIG } from '../../auth.config';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State extends AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState, AuthApiActions.AuthApiActionsUnion> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>(CONFIG.FEATURE_NAME);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
export const getLoggedIn = createSelector(getUser, user => !!user);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
