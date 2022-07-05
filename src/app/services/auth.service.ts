import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User;

  constructor(private afAuth: AngularFireAuth,private router : Router,) {

    //Sauvegarder les données utilisateur dans le localstorage lorsqu'il est connecté et  null lors de la déconnexion

    this.afAuth.authState.subscribe(user => {

      if (user) { this.userData = user; localStorage.setItem('user', JSON.stringify(this.userData));

                } else {localStorage.setItem('user', null);}

    })

  }

  //creation d'un nouveau compte
  signUpWithEmail(value) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)

        .then((res) => { resolve(res) })

        .catch((err) => {
          if (err.code == "auth/email-already-in-use") err = "L'adresse e-mail est déjà utilisée par un autre compte.";
          else if (err.code == "auth/network-request-failed") err = "Veuillez vérifier votre connexion internet.";
          reject(err)
        }
        )

    })
  }

  //se connecter avec un email et mdp
  signInWithEmail(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            this.setUserData(res.user);
            resolve(res);
          })
        .catch((err) => {
          if (err.code == "auth/user-not-found") err = "Il n'y a pas d'utilisateur correspondant à ces identifiants.";
          else if (err.code == "auth/network-request-failed") err = "Veuillez vérifier votre connexion internet.";
          reject(err)
        }
        )
    })
  }

  //set user data
  setUserData(user) {

    this.userData = user;

    localStorage.setItem('user', JSON.stringify(this.userData));

  }

  //se deconnecter 
  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(res => {
            localStorage.removeItem('user');
            resolve(res);
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  // Renvoie les informations de  l'utilisateur connecté

  userDetails() {

    return JSON.parse(localStorage.getItem('user'));

  }

  // Renvoie vrai lorsque l'utilisateur est connecté

  get isLoggedIn(): boolean {

    const user = JSON.parse(localStorage.getItem('user'));

    return (user !== null) ? true : false;

  }


}
