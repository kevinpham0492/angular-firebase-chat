import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
