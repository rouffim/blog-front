import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.loading = false;
    this.submitted = false;

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.form.controls; }

  login(): void {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .pipe(first())
        .subscribe(
          data => {
            this.init();
            if(this.returnUrl.includes('?')) {

            }
            this.router.navigate([this.returnUrl],{queryParams: {uuid: data.uuid}});
          },
          error => {
            this.error = 'Mauvais email ou mot de passe';
            this.loading = false;
          });
    }
  }
}
