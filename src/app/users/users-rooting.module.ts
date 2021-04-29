import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './pages/users/users.component';
import {AuthGuard} from '../auth/shared/auth.guard';
import {UserComponent} from './pages/user/user.component';
import {UserFormComponent} from './pages/user-form/user-form.component';
import {PermissionEnum} from './shared/permission.enum';
import {UserChangeRoleFormComponent} from './pages/user-change-role-form/user-change-role-form.component';

const routes: Routes = [
  { path: 'show', component: UserComponent},
  { path: 'all', component: UsersComponent},
  {
    path: 'edit',
    component: UserFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'role',
    component: UserChangeRoleFormComponent,
    canActivate: [AuthGuard],
    data: {
      permission: PermissionEnum.ChangeRoleUser
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersRootingModule { }
