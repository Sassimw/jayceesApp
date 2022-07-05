import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;

  errorMessage: string = '';

  //Défintion des messages de règles de validation

  validation_messages = {

    'email': [{ type: 'required', message: 'Email obligatoire.' }, { type: 'pattern', message: 'Veuillez saisir un email.' }],

    'password': [{ type: 'required', message: 'Mot de passe obligatoire.' }, { type: 'minlength', message: 'Le mot de passe doit contenir au moins 5 caractères.' }]
  };

  constructor(private router: Router, private navCtrl: NavController,

    private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) { this.router.navigate[('/menu/home')]; }
    //Création de Reactive form
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
    });
  }

  //Appel de  la méthode signInWithEmail du authService
  loginUser(value) {
    this.authService.signInWithEmail(value)
      .then((res) => { this.errorMessage = "";this.navCtrl.navigateForward('/menu/home');
                     })
      .catch((err) => { this.errorMessage = err; });
  }
  //Rediriger l'utilisateur vers la page de création d'un nouveau compte
  goToRegisterPage() { this.navCtrl.navigateForward('/register'); }

}
