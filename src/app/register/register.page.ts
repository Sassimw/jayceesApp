import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [{ type: 'required', message: 'Email obligatoire.' },{ type: 'pattern', message: 'Veuillez saisir un email valide.' }],
    'password': [{ type: 'required', message: 'Mot de passe obligatoire.' },{ type: 'minlength', message: 'Le mot de passe doit contenir au moins 5 caractères.' }]
  };

  constructor(private navCtrl: NavController, private authService: AuthService,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') ])),
      password: new FormControl('', Validators.compose([Validators.minLength(5),Validators.required])),
    });
  }

  tryRegister(value) {
    this.authService.signUpWithEmail(value)
      .then((res) => {this.errorMessage = "";this.successMessage = "Votre compte a été créé. Veuillez vous connecter.";
      }).catch((err) => {this.errorMessage = err;this.successMessage = "";})
  }
goLoginPage() {this.navCtrl.navigateForward('/login');};

}