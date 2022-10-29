import {Component, OnDestroy, OnInit} from '@angular/core';
import {Guest} from '../shared/models/guest.model';
import {DataService} from '../shared/services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css'],
})

export class GuestListComponent implements OnInit, OnDestroy {
  guestList: Guest[] | any;
  loading: boolean;
  guestListSubscription = new Subscription();

  constructor(private dataService: DataService) {
    this.loading = true;
  }

  ngOnInit(): void {
    if (!this.dataService.guestLastLoad.value || Date.now() > this.dataService.guestLastLoad.value + 300000) {
      this.dataService.getGuestData()
        .subscribe(data => {

          this.guestList = [];
          const arr = data.fields.guests.arrayValue.values;

          for (const i of arr) {
            const guest = {};
            const obj = i.mapValue.fields;
            // tslint:disable-next-line:forin
            for (const prop in obj) {
              const propVal = obj[prop];
              if (propVal.booleanValue) {
                guest[prop] = obj[prop].booleanValue;
              } else if (propVal.stringValue) {
                guest[prop] = obj[prop].stringValue;
              }
            }
            this.guestList.push(guest);
          }

          // Set Behavior Subject Values in Data Service
          this.dataService.guestLastLoad.next(Date.now());
          this.dataService.guestList.next(this.guestList);

          // Gracefully render UI
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    } else {
      this.guestListSubscription = this.dataService.guestList
        .subscribe(data => {
          this.guestList = data;
          this.loading = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.guestListSubscription.unsubscribe();
  }
}
