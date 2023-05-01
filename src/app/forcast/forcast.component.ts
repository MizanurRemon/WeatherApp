import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { take } from 'rxjs';
import { WeatherForacast } from '../models/forcast.model';
import { faBars, faLocation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css']
})
export class ForcastComponent implements OnInit {
  menuIcon= faLocation

  place: any;
  forcastData?: WeatherForacast


  constructor(private activateRoute: ActivatedRoute, private weatherServices: WeatherService) {

  }

  ngOnInit(): void {

    this.place = this.activateRoute.snapshot.paramMap.get('city')
    this.get_weather_forcast(this.place)

  }

  onSearch() {

  }


  get_weather_forcast(cityName: any) {

    this.weatherServices.get_weather_forcast(cityName).pipe(take(1)).subscribe(
      {
        next: (response) => {
          this.forcastData = response
        }
      }
    );
  }
}
