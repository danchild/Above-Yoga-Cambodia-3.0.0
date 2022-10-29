import {Component, Input} from '@angular/core';
import {Poi} from '../../../shared/models/poi.model';

@Component({
  selector: 'app-poi-detail',
  templateUrl: './poi-detail.component.html',
  styleUrls: ['./poi-detail.component.css']
})
export class PoiDetailComponent {
  @Input() poi: Poi;

  constructor() {
  }
}
