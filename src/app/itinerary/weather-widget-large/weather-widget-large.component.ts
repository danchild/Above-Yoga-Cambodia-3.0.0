import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
import {WeatherData} from '../../shared/models/weather-data.model';
import {TimeObject} from '../../shared/models/time-object.model';

@Component({
  selector: 'app-weather-widget-large',
  templateUrl: './weather-widget-large.component.html',
  styleUrls: ['./weather-widget-large.component.css']
})
export class WeatherWidgetLargeComponent {
  @Input() weatherData: WeatherData;
  @Input() times: (string | TimeObject)[];
  @Input() temperatures: number[];

  constructor() {
  }
}

