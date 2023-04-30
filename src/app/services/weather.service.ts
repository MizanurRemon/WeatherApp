import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  APP_ID = "a6c534c3d3cea55a218f5ace5795fbd7";
  UNITS = 'metric'
  
  constructor(private http: HttpClient) { }

  get_city_weather(cityName: any){

    let qparams = new HttpParams();
    qparams = qparams.append("q", cityName);
    qparams = qparams.append("appid", this.APP_ID);
    qparams = qparams.append("units", this.UNITS)

    return this.http.get(this.BASE_URL, {params: qparams})

  }
}
