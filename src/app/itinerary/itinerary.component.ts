import {Component, OnDestroy, OnInit} from '@angular/core';
import {Day} from '../shared/models/day.model';
import {WeatherService} from '../shared/services/weather.service';
import {WeatherData} from '../shared/models/weather-data.model';
import {FormatService} from '../shared/services/format.service';
import {TimeObject} from '../shared/models/time-object.model';
import {DayDetail} from '../shared/models/day-details.model';
import {DataService} from '../shared/services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css'],
})
export class ItineraryComponent implements OnInit, OnDestroy {
  itinerary: Day[] | any;
  weatherData: WeatherData;
  maxTemperatures: (number | string)[];
  minTemperatures: (number | string)[];
  times: (string | TimeObject)[];
  temperatures: number[];
  dataLoading = true;
  weatherLoading = true;
  asterisk: { bold: string, message: string } | any;
  dayDetailsList: DayDetail[];
  itinerarySubscription = new Subscription();
  asteriskSubscription = new Subscription();
  weatherDataSubscription = new Subscription();

  constructor(private weatherService: WeatherService,
              private formatService: FormatService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    if (!this.dataService.itineraryLastLoad.value || Date.now() > this.dataService.itineraryLastLoad.value + 300000) {
      // Call Itinerary Data from Server
      this.dataService.getItineraryData()
        .subscribe(data => {
          this.weatherService.itineraryLength.next(data.fields.itinerary.arrayValue.values.length);

          // Set Asterisk
          this.asterisk = {};
          const obj = data.fields.asterisk.mapValue.fields;
          // tslint:disable-next-line:forin
          for (const prop in obj) {
            this.asterisk[prop] = obj[prop].stringValue;
          }

          this.dataService.asterisk.next(this.asterisk);

          // Set Itinerary
          this.itinerary = [];
          const arr = data.fields.itinerary.arrayValue.values;
          for (const i of arr) {
            const day = {};
            // tslint:disable-next-line:no-shadowed-variable
            const obj = i.mapValue.fields;
            for (const prop in obj) {
              if (prop === 'date' || prop === 'dayOfWeek' || prop === 'location') {
                day[prop] = obj[prop].stringValue;
              } else if (prop === 'dayDetails') {
                day[prop] = {
                  city: obj[prop].mapValue.fields.city.stringValue,
                  image: obj[prop].mapValue.fields.image.stringValue,
                  map: obj[prop].mapValue.fields.map.booleanValue,
                  pointsOfInterestRec: obj[prop].mapValue.fields.pointsOfInterestRec.booleanValue,
                  popUpButton: obj[prop].mapValue.fields.popUpButton.booleanValue,
                  restaurantRec: obj[prop].mapValue.fields.restaurantRec.booleanValue,
                  mapCity: {
                    value: obj[prop].mapValue.fields.mapCity.mapValue.fields.value.stringValue,
                    viewValue: obj[prop].mapValue.fields.mapCity.mapValue.fields.viewValue.stringValue
                  }
                };
              } else if (prop === 'events') {
                const events = [];
                // tslint:disable-next-line:no-shadowed-variable
                for (const i of obj[prop].arrayValue.values) {
                  const event = i.mapValue.fields.notes ? {
                    startTime: i.mapValue.fields.startTime.stringValue,
                    event: i.mapValue.fields.event.stringValue,
                    notes: i.mapValue.fields.notes.stringValue
                  } : {
                    startTime: i.mapValue.fields.startTime.stringValue,
                    event: i.mapValue.fields.event.stringValue
                  };
                  events.push(event);
                  day[prop] = events;
                }
              }
            }
            this.itinerary.push(day);
          }

          this.setItineraryData();

          // Set Behavior Subjects in Data Service
          this.dataService.itineraryLastLoad.next(Date.now());
          this.dataService.itinerary.next(this.itinerary);
          // Ensure smooth loading experience
          setTimeout(() => {
            // Toggle off dataLoading to render UI
            // Set Weather
            this.getWeather();
            this.dataLoading = false;
          }, 500);
        });
    } else {
      this.itinerarySubscription = this.dataService.itinerary.subscribe(data => {
        // Set Asterisk Data
        this.asteriskSubscription = this.dataService.asterisk.subscribe(result => {
          this.asterisk = result;
        });

        // Set Itinerary Data from Behavior Subject in Data Service
        this.itinerary = data;
        // this.weatherService.itinerary = this.itinerary;
        this.setItineraryData();
        // Toggle off dataLoading to render UI
        this.dataLoading = false;
        this.getWeather();
      });
    }
  }

  ngOnDestroy(): void {
    this.itinerarySubscription.unsubscribe();
    this.asteriskSubscription.unsubscribe();
    this.weatherDataSubscription.unsubscribe();
  }

  getWeather(): void {
    if (!this.dataService.weatherLastLoad.value || Date.now() > this.dataService.weatherLastLoad.value + 300000) {

      // Call Open Weather API
      this.weatherService.getWeatherForecast()
        .subscribe(result => {
          // Set Weather Data
          this.weatherData = result;
          // Set Weather Data on Behavior Subject in Data Service
          this.dataService.weatherLastLoad.next(Date.now());
          this.dataService.weatherData.next(JSON.parse(JSON.stringify(this.weatherData)));

          this.setWeatherData(this.weatherData);

          // Toggle off dataLoading to render UI
          this.weatherLoading = false;
        });
    } else {
      this.weatherDataSubscription = this.dataService.weatherData.subscribe(result => {
        // Create Deep Clone from Behavior Subject in Data Service
        this.weatherData = JSON.parse(JSON.stringify(result));

        // Set Weather Data
        this.setWeatherData(this.weatherData);

        // Toggle off dataLoading to render UI
        this.weatherLoading = false;
      });
    }
  }

  setWeatherData(weatherData: WeatherData): void {
    this.weatherService.addDummyObjects(weatherData.daily);
    this.maxTemperatures = this.formatService.roundTemperatures(weatherData.daily, 'max');
    this.minTemperatures = this.formatService.roundTemperatures(weatherData.daily, 'min');
    this.times = this.formatService.getShortTimes(weatherData.hourly).slice(0, 12);
    this.temperatures = this.formatService.getRoundedTemperatures(weatherData.hourly).slice(0, 12);
  }

  setItineraryData(): void {
    this.dayDetailsList = [];
    for (const day of this.itinerary) {
      this.dayDetailsList.push(day.dayDetails);
    }
  }
}
