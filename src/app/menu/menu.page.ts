import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  appPages = [ 
    { title: 'Accueil', url: '/menu/home', icon: 'home'}, 
    { title: 'Mes notes', url: '/menu/notes', icon: 'paper-plane'}, 
    { title: 'Méteo', url: '/menu/weather', icon: 'sunny' }, 
    { title: 'Mon profil', url: '/menu/profile', icon: 'person-circle' } 
  ]; 
  
  userEmail : String = "mohamed-wijden.sassi@soprahr.com"

  activePath = ''; 

  constructor(private router : Router) { } 

 
  ngOnInit() {this.router.events.subscribe((event: RouterEvent) => { 

             this.activePath = event.url})
  }

}
