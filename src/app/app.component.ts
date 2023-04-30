import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { take } from 'rxjs';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  STANDARD_TEMP = 20;
  place: string = "dhaka";
  temp: any;
  desc: any;

  constructor(private weatherService: WeatherService) {

  }

  weatherData?: WeatherData;

  ngOnInit(): void {
    this.getWeatherData(this.place)
    this.place = ''
  }

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

       // console.log(this.weatherData)
      }
    });
  }
}
