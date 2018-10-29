// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: 'Angular Ngrx Material',
  i18nPrefix: '',
  maxRetryAttempts: 2,
  server: {
    rootApi: '/api',
  },
  firebase: {
    apiKey: 'AIzaSyBGRKj2b2DbsRFshqMhgnWXyXzVIIk7Mak',
    authDomain: 'angularx-fire-chat.firebaseapp.com',
    databaseURL: 'https://angularx-fire-chat.firebaseio.com',
    projectId: 'angularx-fire-chat',
    storageBucket: 'angularx-fire-chat.appspot.com',
    messagingSenderId: '191914368353'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
