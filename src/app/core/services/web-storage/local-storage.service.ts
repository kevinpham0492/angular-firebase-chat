import { Injectable } from '@angular/core';

const APP_PREFIX = 'APP-';

@Injectable()
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    if (!window.localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.storage = localStorage;
  }

  exists(key: string): boolean {
    return !!this.storage.getItem(`${APP_PREFIX}${key}`);
  }

  getItem(key: string): any {
    const result = this.storage.getItem(`${APP_PREFIX}${key}`);
    if (result === undefined || result == null) {
      return null;
    }
    try {
      return JSON.parse(result);
    } catch (e) {
      return result;
    }
  }

  setItem(key: string, value: any) {
    this.storage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  removeItem(key: string) {
    return this.storage.removeItem(`${APP_PREFIX}${key}`);
  }

  clear() {
    return this.storage.clear();
  }
}
