import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './app/page-not-found/page-not-found.component';
import {PageForbiddenComponent} from './app/page-forbidden/page-forbidden.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomeModule)},
  { path: 'articles', loadChildren: () => import('./articles/articles.module').then( m => m.ArticlesModule)},
  { path: 'users', loadChildren: () => import('./users/users.module').then( m => m.UsersModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  { path: 'error/forbidden', component: PageForbiddenComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
