import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  private city:string;
  private dataWeather:any;
  private errorMessage:string='';
  constructor(
    private ws:WeatherService,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.onLoadWeather();
  }

  onLoadWeather(){
    this.ws.getWeatherData(this.city).subscribe(
      res => {
         this.dataWeather=res } ,
      error => {
         
      }
    );
  }


   //Afficher un toast si ville non trouvée

   async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ville non trouvée',
      duration: 2000
    });toast.present();

  }
}
