import { Component, OnInit } from '@angular/core';
import { MyserviceService } from './services/myservice.service';
import { WeatherService } from './services/weather.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';

  cityName: String = "london";

  constructor(private myService: MyserviceService, private weatherService: WeatherService) { }

  ngOnInit() {

    this.myService.setValue(this.cityName)
  }

  onSearch() {
    //console.log(this.cityName);
    this.myService.setValue(this.cityName)
    this.cityName = ''
  }
 
}
