import { AuthApiActions, LoginPageActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(
  state = initialState,
  action: | AuthApiActions.AuthApiActionsUnion | LoginPageActions.LoginPageActionsUnion
): State {
  switch (action.type) {
    case LoginPageActions.LoginPageActionTypes.LOGIN: 
    case LoginPageActions.LoginPageActionTypes.LOGIN_WITH_GOOGLE: 
    case LoginPageActions.LoginPageActionTypes.LOGIN_WITH_FACEBOOK: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthApiActions.AuthApiActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthApiActions.AuthApiActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
