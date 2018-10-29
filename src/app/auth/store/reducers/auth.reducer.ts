import { AuthApiActions, AuthActions } from '../actions';
import { User } from '../../models';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export function reducer(
  state = initialState,
  action: AuthApiActions.AuthApiActionsUnion | AuthActions.AuthActionsUnion
): State {
  switch (action.type) {
    case AuthActions.AuthActionTypes.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
