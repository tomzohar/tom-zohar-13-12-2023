import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('projects/homepage/src/public-api').then(m => m.HomepageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('projects/favorites/src/public-api').then(m => m.FavoritesModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    pathMatch: "full",
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
