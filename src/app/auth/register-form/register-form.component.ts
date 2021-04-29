import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {UtilsService} from '../../utils/shared/utils.service';
import {ResourceFormComponent} from '../../core/shared/resource-form.component';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent extends ResourceFormComponent implements OnInit {

  userForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(191)
    ]
    ],
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
      RxwebValidators.compare({fieldName: 'password_confirmation'})]],
    password_confirmation:   ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
      RxwebValidators.compare({fieldName: 'password'})]]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.ready = true;
  }

  onSubmit(): void {
    if(this.userForm.invalid) {
      this.utilsService.markFormControlsAsTouched(this.userForm);
    } else {
      this.ready = false;
      const formData = this.utilsService.formToFormData(this.userForm.getRawValue());

      this.authService.register(formData).subscribe({
        next: data => {
          this.router.navigate(['/auth/login']);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  get email(): AbstractControl { return this.userForm.get('email'); }

  get name(): AbstractControl { return this.userForm.get('name'); }

  get password(): AbstractControl { return this.userForm.get('password'); }

  get passwordConfirmation(): AbstractControl { return this.userForm.get('password_confirmation'); }
}
