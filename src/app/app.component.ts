import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  STANDARD_TEMP = 30

  constructor(private weatherService: WeatherService) {

  }

  myDatas: any

  ngOnInit() {
    this.weatherService.get_city_weather("dhaka").pipe(take(1)).subscribe((response) => {

      this.myDatas = response
      console.log(this.myDatas.main.temp)
    })
  }
}
