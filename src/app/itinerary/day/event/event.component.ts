import {Component, Input} from '@angular/core';
import {Events} from '../../../shared/models/events.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input() individualEvent: Events;

  constructor() {
  }
}
