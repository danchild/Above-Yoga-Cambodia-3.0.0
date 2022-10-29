import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  showMobileMenu: boolean;
  isAuthenticated: boolean;
  aboveYogaImage: string;
  headerData: { nav1: string, nav2: string, nav3: string, nav4: string, tripName: string } | any;
  tripName: string;

  constructor(private authService: AuthService, private dataService: DataService) {
    this.isAuthenticated = false;
    this.aboveYogaImage = environment.aboveYogaImage;
    this.tripName = '';
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    this.showMobileMenu = false;
    this.dataService.getGlobalData()
      .subscribe(data => {
        this.headerData = {};
        const obj = data.fields.header.mapValue.fields;
        // tslint:disable-next-line:forin
        for (const prop in obj) {
          this.headerData[prop] = obj[prop].stringValue;
        }
        this.tripName = this.headerData.tripName;
      }, error => console.log(error));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onToggleMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }
}
