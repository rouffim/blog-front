import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/shared/auth.service';
import {UtilsService} from '../../../utils/shared/utils.service';
import {RoleEnum} from '../../shared/role.enum';
import { EnumObject } from 'src/app/core/shared/enum-object';
import {ResourceFormComponent} from '../../../core/shared/resource-form.component';

@Component({
  selector: 'app-user-change-role-form',
  templateUrl: './user-change-role-form.component.html',
  styleUrls: ['./user-change-role-form.component.css']
})
export class UserChangeRoleFormComponent extends ResourceFormComponent implements OnInit {
  user: User;
  roles: EnumObject[];

  userRoleForm = this.fb.group({
    role: ['', [
        Validators.required,
        Validators.min(RoleEnum.Viewer),
        Validators.max(RoleEnum.Admin)
      ]
    ],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {
    super();

    this.roles = this.utilsService.enumToArray(RoleEnum);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.uuid = params['uuid'] || null;
    });

    this.initForm();
  }

  async initForm(): Promise<void> {
    this.ready = false;

    if(this.uuid) {
      this.user = await this.userService.getUser(this.uuid);
      if(this.user.uuid === this.authService.currentUserValue.uuid) {
        this.user = null;
        this.hasError = true;
        this.errorMessage = "Vous n'avez pas la permission de changer votre rôle.";
      }

      this.patchForm();
    } else {
      this.user = null;
    }

    this.ready = true;
  }

  patchForm(): void {
    if(this.user) {
      this.userRoleForm.patchValue({
        role: this.user.role,
      });
    }
  }

  onSubmit(): void {
    if(this.userRoleForm.invalid) {
      this.utilsService.markFormControlsAsTouched(this.userRoleForm);
    } else {
      this.ready = false;
      const formData = this.utilsService.formToFormData(this.userRoleForm.getRawValue());

      this.userService.saveUser(this.userRoleForm.value, this.user.uuid).subscribe({
        next: data => {
          this.router.navigate(['/users/all']);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  get role(): AbstractControl { return this.userRoleForm.get('role'); }
}

