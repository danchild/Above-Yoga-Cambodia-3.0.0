import {Component, Input} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {WeatherData} from '../../../shared/models/weather-data.model';
import {WeatherService} from '../../../shared/services/weather.service';

@Component({
  selector: 'app-weather-widget-small',
  templateUrl: './weather-widget-small.component.html',
  styleUrls: ['./weather-widget-small.component.css']
})
export class WeatherWidgetSmallComponent {
  @Input() weatherData: WeatherData;
  @Input() minTemperature: number;
  @Input() maxTemperature: number;
  @Input() feelsLike: number;
  @Input() currentTemp: number;
  @Input() humidity: number;
  @Input() icon: string;
  @Input() currentWeatherDescription: string;
  @Input() uvi: number;
  @Input() sunrise: string;
  @Input() sunset: string;
  weatherIconsPath = environment.weatherIconsPath;
  city: string;

  constructor(private weatherService: WeatherService) {
    this.city = this.weatherService.city;
  }
}

