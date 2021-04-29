import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/shared/auth.service';
import {UtilsService} from '../../../utils/shared/utils.service';
import {User} from '../../shared/user';
import {UserService} from '../../shared/user.service';
import {ResourceFormComponent} from '../../../core/shared/resource-form.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends ResourceFormComponent implements OnInit {
  formImage: string;
  user: User;

  userForm = this.fb.group({
    name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]
    ],
    imageInput: [''],
    image: [''],
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
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    this.route.queryParams.subscribe(params => {
      this.uuid = params['uuid'] || null;
    });

    this.initForm();
  }

  async initForm(): Promise<void> {
    this.ready = false;

    if(this.uuid) {
      this.user = await this.userService.getUser(this.uuid);
      if(this.user.uuid !== this.authService.currentUserValue.uuid) {
        this.user = null;
        this.hasError = true;
        this.errorMessage = "Vous n'avez pas la permission d'éditer les informations d'un autre utilisateur.";
      }

      this.patchForm();
    } else {
      this.user = null;
    }

    this.ready = true;
  }

  patchForm(): void {
    if(this.user) {
      this.userForm.patchValue({
        name: this.user.name,
      });

      this.formImage = this.user.image;
    }
  }

  onSubmit(): void {
    if(this.userForm.invalid) {
      this.utilsService.markFormControlsAsTouched(this.userForm);
    } else {
      this.ready = false;
      const formData = this.utilsService.formToFormData(this.userForm.getRawValue());

      this.userService.saveUser(formData, this.user.uuid).subscribe({
        next: data => {
          this.authService.updateUser(data);
          this.router.navigate(['/']);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  onFileChange(event): void {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const file = event.target.files.item(0);

      this.userForm.patchValue({
        image: file
      });

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formImage = reader.result as string;
      };
    }
  }

  get name(): AbstractControl { return this.userForm.get('name'); }
}
