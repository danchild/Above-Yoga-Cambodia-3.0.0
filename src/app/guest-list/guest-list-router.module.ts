import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestListComponent} from './guest-list.component';

const routes: Routes = [
  {
    path: '',
    component: GuestListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestListRouterModule {
}
