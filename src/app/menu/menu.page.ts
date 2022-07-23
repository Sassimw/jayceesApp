import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  appPages = [ 
    { title: 'Home', url: '/menu/home', icon: 'home'} , 
    { title: 'Session', url: '/menu/notes', icon: 'book'}, 
    { title: 'Evenments', url: '/menu/evenments', icon: 'calendar'}, 
    { title: 'Actions', url: '/menu/actions', icon: 'footsteps'}, 
    { title: 'Contacts', url: '/menu/contacts', icon: 'call' },
    { title: 'Mon profil', url: '/menu/profile', icon: 'person-circle' } 
  ]; 
  
  userEmail : String = "mohamed-wijden.sassi@soprahr.com"

  activePath = ''; 

  constructor(private router : Router,private navCtrl : NavController, private authService: AuthService) { } 

 
  ngOnInit() {this.router.events.subscribe((event: RouterEvent) => { 

             this.activePath = event.url})

             this.userEmail= this.authService.userDetails().email;
  }
  
  //Après déconnexion, rediriger l'utilisateur vers la page de login
  onLogout() {
    this.authService.logoutUser()
      .then(res => {this.navCtrl.navigateBack('login');})
      .catch(error => {console.log(error);})
  }
}
