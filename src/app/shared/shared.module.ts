import {NgModule} from '@angular/core';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {LoadingEllipsesComponent} from './loading-ellipses/loading-ellipses.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    LoadingEllipsesComponent
  ],
  exports: [LoadingSpinnerComponent, LoadingEllipsesComponent]
})
export class SharedModule {
}
