import {Component, Input} from '@angular/core';
import {Restaurant} from '../../../shared/models/restaurant.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})

export class RestaurantComponent {
  @Input() restaurant: Restaurant;

  constructor() {
  }

}
