import {NgModule} from '@angular/core';
import {GoogleDriveComponent} from './google-drive.component';
import {CommonModule} from '@angular/common';
import {GoogleDriveRouterModule} from './google-drive-router.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    GoogleDriveComponent
  ],
  imports: [
    CommonModule,
    GoogleDriveRouterModule,
    SharedModule
  ]
})
export class GoogleDriveModule {
}
