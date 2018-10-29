import { AuthenticationGuard } from './authentication.guard';
import { UnAuthenticationGuard } from './unauthentication.guard';

export {
  AuthenticationGuard,
  UnAuthenticationGuard
};

export const GUARDS =  [
  AuthenticationGuard,
  UnAuthenticationGuard
];
