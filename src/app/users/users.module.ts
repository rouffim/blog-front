import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersRootingModule} from './users-rooting.module';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserComponent} from './pages/user/user.component';
import {UsersComponent} from './pages/users/users.component';



@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailsComponent,
    UserComponent,
    UsersComponent
  ],
  exports: [
    UsersListComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    UsersRootingModule
  ]
})
export class UsersModule { }
