import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  markFormControlsAsTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  formToFormData(formValue: any): FormData {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];

      if(value)
        formData.append(key, value);
    }

    return formData;
  }
}
