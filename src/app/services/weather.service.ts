import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private HttpClient : HttpClient) { 

  }

  getWeatherData(city : string){
    return this.HttpClient.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=910986f6ddc1d6a91d902c9919162444") ; 
  }
}
