import { LoginFormComponent } from './login-form/login-form.component';
import {
  LogoutConfirmationDialogComponent as LogoutConfirmationDialog
} from './logout-confirmation-dialog/logout-confirmation-dialog.component';

export {
  LogoutConfirmationDialog
};

export const SHARED_COMPONENTS = [
  LoginFormComponent,
  LogoutConfirmationDialog
];

export const ENTRY_COMPONENTS = [
  LogoutConfirmationDialog
];
