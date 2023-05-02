import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';
import { take } from 'rxjs';
import { MyserviceService } from '../services/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  STANDARD_TEMP = 20;

  temp: any;
  desc: any;
  isMenuOpened: Boolean = false

  //icons
  menuIcon = faBars

  // @ViewChild('toggleButton')
  // toggleButton!: ElementRef;
  // @ViewChild('menu') menu: ElementRef;

  constructor(private weatherService: WeatherService, private myService: MyserviceService, private router: Router, private renderer: Renderer2) {
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   /**
    //    * Only run when toggleButton is not clicked
    //    * If we don't check this, all clicks (even on the toggle button) gets into this
    //    * section which in the result we might never see the menu open!
    //    * And the menu itself is checked here, and it's where we check just outside of
    //    * the menu and button the condition abbove must close the menu
    //    */
    //   if (!this.toggleButton.nativeElement.contains(e.target) && !this.menu.nativeElement.contains(e.target)) {
    //     this.isMenuOpened = false;
    //   }
    // });
  }

  place: any;
  navPlace: any;

  weatherData?: WeatherData;

  ngOnInit(): void {
    //this.place = this.myService.getValue();
    this.getCurrentLocation()
    this.navPlace = this.place;
    this.place = ''
  }

  onSearch() {
    this.getWeatherData(this.place)
    this.navPlace = this.place;
    this.place = ''
  }

  private getWeatherData(cityName: any) {
    this.weatherService.get_city_weather(cityName).pipe(take(1)).subscribe({
      next: (response) => {

        this.weatherData = response

        this.temp = this.weatherData.main.temp
        this.desc = this.weatherData.weather[0].description

        // console.log("lat: "+this.weatherData.coord.lat+" "+this.weatherData.coord.lon)
      }
    });
  }

  redirectToForcast() {
    this.router.navigate(['/forcast/' + this.navPlace]);
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {

            if (position) {

              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const details = this.weatherService.get_places(lat, lng);

              this.weatherService.get_places(lat, lng).pipe(take(1)).subscribe({
                next: (response) => {
                  const myData = response;
                  this.place = myData[0].name
                  this.navPlace = this.place;
                  this.getWeatherData(this.place)
                  this.place = ''
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

 
  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside() {
    this.isMenuOpened = false;
  }
}
