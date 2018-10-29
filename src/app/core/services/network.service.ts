import { BehaviorSubject } from 'rxjs';

export class NetworkService {
  private _isOnline: BehaviorSubject<boolean>;

  public get isOnline() {
    return this._isOnline;
  }

  constructor() {
    this._isOnline = new BehaviorSubject<boolean>(navigator.onLine);
    window.addEventListener('online', () => {
      this._isOnline.next(true);
    });
    window.addEventListener('offline', () => {
      this._isOnline.next(false);
    });
  }

}

