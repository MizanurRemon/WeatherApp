import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  private cityName: any;

  constructor() { }

  setValue(val: any) {
    this.cityName = val;
  }

  getValue() {
    return this.cityName;
  }
}
