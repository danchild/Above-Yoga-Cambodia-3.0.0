import {NgModule} from '@angular/core';
import {GuestListComponent} from './guest-list.component';
import {GuestComponent} from './guest/guest.component';
import {CommonModule} from '@angular/common';
import {GuestListRouterModule} from './guest-list-router.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    GuestListComponent,
    GuestComponent
  ],
  imports: [
    CommonModule,
    GuestListRouterModule,
    SharedModule
  ]
})
export class GuestListModule {
}
