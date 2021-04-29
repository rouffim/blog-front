import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersRootingModule} from './users-rooting.module';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserComponent} from './pages/user/user.component';
import {UsersComponent} from './pages/users/users.component';
import {UserFormComponent} from './pages/user-form/user-form.component';
import {UserChangeRoleFormComponent} from './pages/user-change-role-form/user-change-role-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {UtilsModule} from '../utils/utils.module';



@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailsComponent,
    UserComponent,
    UsersComponent,
    UserFormComponent,
    UserChangeRoleFormComponent,
  ],
  exports: [
    UsersListComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    UsersRootingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    UtilsModule
  ]
})
export class UsersModule { }
