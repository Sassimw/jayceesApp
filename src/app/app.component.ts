import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent { 

  constructor( 

    private authService : AuthService,

    private platform: Platform, 

    //private splashScreen: SplashScreen, 

    //private statusBar: StatusBar, 

    private router : Router 

  ) { 

    this.initializeApp(); 


  } 

 
  initializeApp() { 

    this.platform.ready().then(() => { 

      //this.statusBar.styleDefault(); 

      //this.splashScreen.hide(); 

      //this.router.navigateByUrl("menu/home"); 

      this.isLoggedIn() ; 

    }); 

  } 

  isLoggedIn(){

    if (this.authService.isLoggedIn){  this.router.navigateByUrl("/menu/home");} 

    else {this.router.navigateByUrl("/login");}

  }

} 
