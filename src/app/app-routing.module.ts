import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/services/auth-guard.service';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'itinerary', canActivate: [AuthGuard],
    loadChildren: () => import('./itinerary/itinerary.module').then(m => m.ItineraryModule)
  },
  {
    path: 'guests', canActivate: [AuthGuard],
    loadChildren: () => import('./guest-list/guest-list.module').then(m => m.GuestListModule)
  },
  {
    path: 'local-area', canActivate: [AuthGuard],
    loadChildren: () => import('./local-area/local-area.module').then(m => m.LocalAreaModule)
  },
  {
    path: 'google-drive', canActivate: [AuthGuard],
    loadChildren: () => import('./google-drive/google-drive.module').then(m => m.GoogleDriveModule)
  },
  {
    path: '**', canActivate: [AuthGuard],
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
