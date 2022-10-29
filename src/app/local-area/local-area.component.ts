import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from '../shared/services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-local-area',
  templateUrl: './local-area.component.html',
  styleUrls: ['./local-area.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocalAreaComponent implements OnInit, OnDestroy {
  selectedCategory: string;
  selectedCity: string;
  categories = environment.categories;
  cities = environment.cities.slice(0, 3);
  mode = environment.mode;
  loading = true;
  categorySubscription = new Subscription();
  citySubscription = new Subscription();

  constructor(private dataService: DataService, private changeDetectorRef: ChangeDetectorRef) {
    this.dataService.onLoaded.subscribe(value => {
      this.loading = value;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit(): void {
    this.categorySubscription = this.dataService.selectedCategory.subscribe(value => {
      this.selectedCategory = value;
    });

    this.citySubscription = this.dataService.selectedCity.subscribe(value => {
      this.selectedCity = value;
    });
    this.modifyCitiesList();
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.citySubscription.unsubscribe();
  }

  modifyCitiesList(): void {
    if (this.selectedCategory === 'category2') {
      if (this.selectedCity === 'city3') {
        this.selectedCity = 'city1';
      }
      this.cities = [
        {value: 'city1', viewValue: 'Ennis'},
        {value: 'city2', viewValue: 'Liscannor/Lahinch'}
      ];
    } else {
      this.cities = environment.cities.slice(0, 3);
    }

  }
}
