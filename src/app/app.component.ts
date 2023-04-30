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
    this.getCurrentLocation()
    this.myService.setValue(this.cityName)
    
  }

  onSearch() {
    console.log(this.cityName);
    this.myService.setValue(this.cityName)
    this.cityName = ''
  }
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {

            if (position) {
              // console.log(
              //   'Latitude: ' +
              //   position.coords.latitude + " " +
              //   'Longitude: ' +
              //   position.coords.longitude
              // );
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

             // const details = this.weatherService.get_places(lat, lng);

              this.weatherService.get_places(lat, lng).pipe(take(1)).subscribe({
                next: (response) => {
                      const myData = response;
                      this.cityName = myData[0].name
                      console.log("lat: "+myData[0].name)
                }
              });

              const location = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
}
