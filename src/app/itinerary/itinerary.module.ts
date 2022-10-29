import {NgModule} from '@angular/core';
import {ItineraryComponent} from './itinerary.component';
import {WeatherWidgetLargeComponent} from './weather-widget-large/weather-widget-large.component';
import {ForecastComponent} from './weather-widget-large/forecast/forecast.component';
import {DayComponent} from './day/day.component';
import {EventComponent} from './day/event/event.component';
import {DayDetailsComponent} from './day/day-details/day-details.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ItineraryRoutingModule} from './itinerary-routing.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ItineraryComponent,
    WeatherWidgetLargeComponent,
    ForecastComponent,
    DayComponent,
    EventComponent,
    DayDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ItineraryRoutingModule,
    MatIconModule,
  ]
})
export class ItineraryModule {
}
