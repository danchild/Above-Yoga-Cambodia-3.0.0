import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './welcome.component';
import {WelcomeCarouselComponent} from './welcome-carousel/welcome-carousel.component';
import {WeatherWidgetSmallComponent} from './welcome-carousel/weather-widget-small/weather-widget-small.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {WelcomeRoutingModule} from './welcome-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    WelcomeComponent,
    WelcomeCarouselComponent,
    WeatherWidgetSmallComponent
  ],
  imports: [
    NgbCarouselModule,
    WelcomeRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class WelcomeModule {
}
