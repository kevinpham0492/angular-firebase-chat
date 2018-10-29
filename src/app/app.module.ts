import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment as env } from '@app/env';
import { CoreModule } from '@app/core';
import { AuthModule } from '@app/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';

const ANGULAR_FIRE_MODULES = [
  AngularFireModule.initializeApp(env.firebase),
  AngularFirestoreModule,
  AngularFireAuthModule,
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    ...ANGULAR_FIRE_MODULES,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: env.production })
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
