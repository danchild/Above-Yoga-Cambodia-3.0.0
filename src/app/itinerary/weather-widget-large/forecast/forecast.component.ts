import {Component, Input} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {TimeObject} from '../../../shared/models/time-object.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  @Input() time: string | TimeObject;
  @Input() temp: number;
  @Input() icon: string;
  @Input() description: string;
  weatherIconsPath = environment.weatherIconsPath;

  constructor() {
  }

}
