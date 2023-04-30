import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';
import { take } from 'rxjs';
import { MyserviceService } from '../services/myservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  STANDARD_TEMP = 20;
  
  temp: any;
  desc: any;

  //icons
  menuIcon= faBars

  constructor(private weatherService: WeatherService, private myService: MyserviceService) {

  }

  place: any;

  weatherData?: WeatherData;

  ngOnInit(): void {
    this.place = this.myService.getValue();
    this.getWeatherData(this.place)
    this.place = ''
  }

//   get val() {
//     console.log("place:: "+this.myService.getValue())
//     return this.myService.getValue();
// }

  onSearch(){
    this.getWeatherData(this.place)
    this.place = ''
  }

  private getWeatherData(cityName: any){
    this.weatherService.get_city_weather(cityName).pipe(take(1)).subscribe({
      next: (response) => {

        this.weatherData = response

        this.temp = this.weatherData.main.temp
        this.desc = this.weatherData.weather[0].description

      // console.log("lat: "+this.weatherData.coord.lat+" "+this.weatherData.coord.lon)
      }
    });
  }
}