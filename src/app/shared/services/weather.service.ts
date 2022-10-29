/**
 * Weather Service provides forecasts for up to 8 total days (including today)
 */

import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {DataService} from './data.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {WeatherData} from '../models/weather-data.model';
import {Daily} from '../models/daily.model';

@Injectable({providedIn: 'root'})
export class WeatherService {
  // OneCall API
  weatherData: WeatherData;
  openWeatherApiKey: string;
  oneCallApiUrl: string;
  units: string;
  lat: number;
  lng: number;
  tripStartUnixTimeStamp: number;
  currentUnixTimeStamp: number;
  itineraryLength = new BehaviorSubject<number>(null);

  // Small Weather Widget
  city: string;

  private http: HttpClient;

  constructor(private dataService: DataService, httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
    this.oneCallApiUrl = environment.oneCallApiUrl;
    this.openWeatherApiKey = environment.openWeatherApiKey;
    this.units = environment.units;

    // Dynamically set Latitude, Longitude, and City based on day of trip.
    const now = Date.now();
    const days = (now - environment.tripStartUnixTimeStamp * 1000) / 8.64e+7;
    if (days < 0) {
      this.lat = environment.weatherSettings[0].lat;
      this.lng = environment.weatherSettings[0].lng;
      this.city = environment.weatherSettings[0].city;
    } else if (days >= environment.weatherSettings.length) {
      this.lat = environment.weatherSettings[environment.weatherSettings.length - 1].lat;
      this.lng = environment.weatherSettings[environment.weatherSettings.length - 1].lng;
      this.city = environment.weatherSettings[environment.weatherSettings.length - 1].city;
    } else {
      for (let i = 0; i < environment.weatherSettings.length; i++) {
        if (days >= i && days < i + 1) {
          this.lat = environment.weatherSettings[i].lat;
          this.lng = environment.weatherSettings[i].lng;
          this.city = environment.weatherSettings[i].city;
          break;
        }
      }
    }

    this.tripStartUnixTimeStamp = environment.tripStartUnixTimeStamp;
    this.currentUnixTimeStamp = Math.floor((new Date().getTime()) / 1000);
  }

  getWeatherForecast(): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.oneCallApiUrl}/onecall?lat=${this.lat}&lon=${this.lng}&units=${this.units}&exclude=minutely,alerts&appid=${this.openWeatherApiKey}`, {responseType: 'json'});
  }

  getDaysElapsed(): number {
    return Math.floor((this.currentUnixTimeStamp - this.tripStartUnixTimeStamp) / 3600 / 24);
  }

  unshiftLoop(iterator: number, dailyArray: Daily[], dummyObject: Daily): void {
    for (let i = 0; i < iterator; i++) {
      dailyArray.unshift(dummyObject);
    }
  }

  pushLoop(iterator: number, dailyArray: Daily[], dummyObject: Daily): void {
    for (let i = 0; i < iterator; i++) {
      dailyArray.push(dummyObject);
    }
  }

  popLoop(iterator: number, dailyArray: Daily[]): void {
    for (let i = 0; i < iterator; i++) {
      dailyArray.pop();
    }
  }

  spliceLoop(iterator: number, dailyArray: Daily[]): void {
    for (let i = 0; i < iterator; i++) {
      dailyArray.splice(0, 1);
    }
  }

  assignDummyLoop(dailyArray: Daily[], dummyObject: Daily): void {
    for (let i = 0; i < this.itineraryLength.value; i++) {
      dailyArray[i] = dummyObject;
    }
  }

  /* If OneWeatherAPI forecast returns an array with a length different from 8, change every instance of 8 in addDummyObjects()
       to the updated length */
  addDummyObjects(dailyArray: Daily[]): void {
    const dummyObject = {
      weather: [
        {
          icon: ''
        }
      ],
      temp: {
        min: 0,
        max: 0
      }
    };
    const daysBeforeOrElapsed = this.getDaysElapsed();
    let iterator = daysBeforeOrElapsed;
    // Block 1
    if (daysBeforeOrElapsed >= 0 && daysBeforeOrElapsed <= this.itineraryLength.value) {
      if (this.itineraryLength.value > 8) {
        this.unshiftLoop(iterator, dailyArray, dummyObject);
        iterator = this.itineraryLength.value - 8;
        this.pushLoop(iterator, dailyArray, dummyObject);
        if (dailyArray.length > this.itineraryLength.value) {
          iterator = dailyArray.length - this.itineraryLength.value;
          this.popLoop(iterator, dailyArray);
        }
      } else {
        this.unshiftLoop(iterator, dailyArray, dummyObject);
        iterator = iterator + 8 - this.itineraryLength.value;
        this.popLoop(iterator, dailyArray);
      }
      // Block 2
    } else if (daysBeforeOrElapsed >= 0 && daysBeforeOrElapsed > this.itineraryLength.value) {
      if (this.itineraryLength.value > 8) {
        this.assignDummyLoop(dailyArray, dummyObject);
      } else {
        this.assignDummyLoop(dailyArray, dummyObject);
        iterator = 8 - this.itineraryLength.value;
        this.popLoop(iterator, dailyArray);
      }
      // Block 3
    } else if (daysBeforeOrElapsed < 0 && daysBeforeOrElapsed * -1 <= this.itineraryLength.value) {
      iterator *= -1;
      if (this.itineraryLength.value > 8) {
        this.spliceLoop(iterator, dailyArray);
        iterator = this.itineraryLength.value - 8 + iterator;
        if (daysBeforeOrElapsed * -1 > 8) {
          this.assignDummyLoop(dailyArray, dummyObject);
        } else {
          this.pushLoop(iterator, dailyArray, dummyObject);
        }
      } else {
        this.spliceLoop(iterator, dailyArray);
        this.pushLoop(iterator, dailyArray, dummyObject);
        if (dailyArray.length > this.itineraryLength.value) {
          iterator = dailyArray.length - this.itineraryLength.value;
          this.popLoop(iterator, dailyArray);
        }
      }
      // Block 4
    } else if (daysBeforeOrElapsed < 0 && daysBeforeOrElapsed * -1 > this.itineraryLength.value) {
      if (this.itineraryLength.value > 8) {
        this.assignDummyLoop(dailyArray, dummyObject);
      } else {
        iterator *= -1;
        this.spliceLoop(iterator, dailyArray);
        this.pushLoop(iterator, dailyArray, dummyObject);
        if (dailyArray.length > this.itineraryLength.value) {
          iterator = dailyArray.length - this.itineraryLength.value;
          this.popLoop(iterator, dailyArray);
        }
      }
    }
  }
}
