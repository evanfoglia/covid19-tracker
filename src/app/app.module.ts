import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserProfileComponent } from './user-profile/user-profile.component';

var config = {
  apiKey: "AIzaSyA40yCHj5fh72Ljph0vKs6N_0FUp7ryRls",
  authDomain: "covid-tracker-e3276.firebaseapp.com",
  databaseURL: "https://covid-tracker-e3276.firebaseio.com",
  projectId: "covid-tracker-e3276",
  storageBucket: "covid-tracker-e3276.appspot.com",
  messagingSenderId: "985274498958",
  appId: "1:985274498958:web:a8504cbf3402ba3c6a2edf",
  measurementId: "G-QLTPLC1VKB"

};

@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginPageComponent,
    UserProfileComponent
   ],


  imports: [
    BrowserModule,
    RouterModule,
    // 3. Initialize
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,// storage
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
