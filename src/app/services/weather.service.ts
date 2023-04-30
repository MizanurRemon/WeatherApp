import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';
import { PlaceList } from '../models/places.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  APP_ID = "a6c534c3d3cea55a218f5ace5795fbd7";
  UNITS = 'metric'

  GEOCODE_BASE_URL = 'http://api.openweathermap.org/geo/1.0/reverse'

  constructor(private http: HttpClient) { }

  get_city_weather(cityName: any): Observable<WeatherData> {

    let qparams = new HttpParams();
    qparams = qparams.append("q", cityName);
    qparams = qparams.append("appid", this.APP_ID);
    qparams = qparams.append("units", this.UNITS)

    return this.http.get<WeatherData>(this.BASE_URL, { params: qparams })

  }

  get_places(lat:any, long:any):Observable<PlaceList>{
    let qparams = new HttpParams();
    qparams = qparams.append("lat", lat);
    qparams = qparams.append("lon", long);
    qparams = qparams.append("appid", this.APP_ID);
    qparams = qparams.append("limit", 0)
    
    return this.http.get<PlaceList>(this.GEOCODE_BASE_URL, { params: qparams })
  }
}
