import {NgModule} from '@angular/core';
import {LocalAreaComponent} from './local-area.component';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {RestaurantComponent} from './restaurant-list/restaurant/restaurant.component';
import {PoiListComponent} from './poi-list/poi-list.component';
import {PoiDetailComponent} from './poi-list/poi-detail/poi-detail.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {LocalAreaRouterModule} from './local-area-router.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    LocalAreaComponent,
    RestaurantListComponent,
    RestaurantComponent,
    PoiListComponent,
    PoiDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LocalAreaRouterModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class LocalAreaModule {
}
