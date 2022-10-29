/* tslint:disable:prefer-for-of */
import {Injectable} from '@angular/core';
import {TimeObject} from '../models/time-object.model';

@Injectable({providedIn: 'root'})
export class FormatService {

  constructor() {
  }

  formatTime(unixTimestamp: number): string {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleTimeString();
  }

  formatTimeObjects(time: string): TimeObject {
    const split = time.split(/[\s:]+/);
    return {
      hour: split[0],
      meridiem: split[split.length - 1]
    };
  }

  getLongTime(unixTimestamp: number): string {
    const humanDateFormat = this.formatTime(unixTimestamp);
    const split = humanDateFormat.split(/[\s:]+/);
    return `${split[0]}:${split[1]} ${split[split.length - 1]}`;
  }

  getShortTimes(hourlyArray: any[]): (string | TimeObject)[] {
    const times: (string | TimeObject)[] = ['Now'];
    for (let i = 1; i < hourlyArray.length; i++) {
      const time = this.formatTimeObjects(this.formatTime(hourlyArray[i].dt));
      times.push(time);
    }
    return times;
  }

  roundTemperatures(dailyArray: any[], minOrMax: 'min' | 'max'): number[] {
    const temperatures = [];
    if (minOrMax === 'min') {
      for (let i = 0; i < dailyArray.length; i++) {
        if (typeof dailyArray[i].temp.min === 'string') {
          temperatures.push(dailyArray[i].temp.min);
        } else {
          const temperature = Math.round(dailyArray[i].temp.min);
          temperatures.push(temperature);
        }
      }
    } else if (minOrMax === 'max') {
      for (let i = 0; i < dailyArray.length; i++) {
        if (typeof dailyArray[i].temp.max === 'string') {
          temperatures.push(dailyArray[i].temp.max);
        } else {
          const temperature = Math.round(dailyArray[i].temp.max);
          temperatures.push(temperature);
        }
      }
    }
    return temperatures;
  }

  getRoundedTemperatures(hourlyArray: any[]): number[] {
    const temperatures = [];
    for (let i = 0; i < hourlyArray.length; i++) {
      const temperature = Math.round(hourlyArray[i].temp);
      temperatures.push(temperature);
    }
    return temperatures;
  }

  internationalConversion(cell: string): string {
    return cell.replace(/[- +]/g, '');
  }
}
