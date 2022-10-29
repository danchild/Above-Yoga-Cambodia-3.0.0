import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, Subject} from 'rxjs';
import {Guest} from '../models/guest.model';
import {WeatherData} from '../models/weather-data.model';
import {environment} from '../../../environments/environment';
import {UserData} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class DataService {
  selectedCategory: BehaviorSubject<string>;
  selectedCity: BehaviorSubject<string>;
  guestList: BehaviorSubject<Guest[]>;
  guestLastLoad: BehaviorSubject<number>;
  itinerary: BehaviorSubject<any>;
  asterisk: BehaviorSubject<any>;
  itineraryLastLoad: BehaviorSubject<number>;
  weatherData: BehaviorSubject<WeatherData>;
  weatherLastLoad: BehaviorSubject<number>;
  welcomeData: BehaviorSubject<any>;
  welcomeLastLoad: BehaviorSubject<number>;
  onLoaded = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.selectedCategory = new BehaviorSubject('category1');
    this.selectedCity = new BehaviorSubject('city1');
    this.guestList = new BehaviorSubject(null);
    this.guestLastLoad = new BehaviorSubject(null);
    this.itinerary = new BehaviorSubject(null);
    this.itineraryLastLoad = new BehaviorSubject(null);
    this.weatherData = new BehaviorSubject(null);
    this.weatherLastLoad = new BehaviorSubject(null);
    this.welcomeData = new BehaviorSubject(null);
    this.welcomeLastLoad = new BehaviorSubject(null);
    this.asterisk = new BehaviorSubject(null);
  }

  getGlobalData(): Observable<any> {
    return this.http.get(`https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)/documents/global/1`,
      {responseType: 'json'});
  }

  getWelcomeData(): Observable<any> {
    return this.http.get(`https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)/documents/welcome/1`,
      {responseType: 'json'});
  }

  getGuestData(): Observable<any> {
    return this.http.get(`https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)/documents/guests/1`,
      {responseType: 'json'});
  }

  getItineraryData(): Observable<any> {
    return this.http.get(`https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)/documents/itinerary/1`,
      {responseType: 'json'});
  }

  getRestaurantData(): Observable<any> {
    return this.http.get(`https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)/documents/restaurants/1`,
      {responseType: 'json'});
  }

  getPoiData(): Observable<any> {
    return this.http.get(`https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)/documents/poi/1`,
      {responseType: 'json'});
  }

  getAccommodationsData(): Observable<any> {
    return this.http.get(`https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)/documents/accommodations/1`,
      {responseType: 'json'});
  }

}
