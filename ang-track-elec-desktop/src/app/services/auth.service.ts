import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }


  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('success with login');
        this.router.navigate(['/home']);
      }).catch(error => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
      });
  }

  logoutUser(): Promise<void> {
    return this.afAuth.signOut()
    .then(() => {
        this.router.navigate(['/login']);                    // when we log the user out, navigate them to home
    })
    .catch(error => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
            return error;
    });
  }
}

