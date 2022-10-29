/**
 * Day class is used to define properties that represent a single Day of Events.
 */

import {Events} from './events.model';
import {DayDetail} from './day-details.model';

export class Day {
  dayOfWeek: string;
  date: string;
  location: string;
  events: Events[];
  dayDetails: DayDetail;

  constructor(dayOfWeek: string, date: string, location: string, events: Events[], dayDetails: DayDetail) {
    this.dayOfWeek = dayOfWeek;
    this.date = date;
    this.location = location;
    this.events = events;
    this.dayDetails = dayDetails;
  }
}
