import {Component, Input, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {DayDetail} from '../../../shared/models/day-details.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../shared/services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.css']
})
export class DayDetailsComponent implements OnInit, OnDestroy {
  @Input() dayDetail: DayDetail;
  @Input() content: ElementRef<HTMLElement>;
  selectedCategory: string;
  selectedCity: string;
  categorySubscription = new Subscription();
  citySubscription = new Subscription();

  constructor(private modalService: NgbModal, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.categorySubscription = this.dataService.selectedCategory.subscribe(value => {
      this.selectedCategory = value;
    });

    this.citySubscription = this.dataService.selectedCity.subscribe(value => {
      this.selectedCity = value;
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.citySubscription.unsubscribe();
  }

  close(): void {
    this.modalService.dismissAll(this.content);
  }

  closeRestaurant(): void {
    this.dataService.selectedCategory.next('category1');
    this.dataService.selectedCity.next(this.dayDetail.mapCity.value);
    this.modalService.dismissAll(this.content);
  }

  closeLocalArea(): void {
    this.dataService.selectedCategory.next('category2');
    this.dataService.selectedCity.next(this.dayDetail.mapCity.value);
    this.modalService.dismissAll(this.content);
  }

}
