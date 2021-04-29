import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { EnumObject } from '../../core/shared/enum-object';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

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

  singleParamToHttpParams(name: string, param?: any): HttpParams {
    let httpParams = new HttpParams();

    if(param)
      httpParams = httpParams.append(name, String(param));

    return httpParams;
  }

  stringIsNumber(value): boolean {
    return isNaN(Number(value)) === false;
  }

  enumToArray(enumme): EnumObject[] {
    return Object.keys(enumme)
      .filter(this.stringIsNumber)
      .map(key => new EnumObject(key, enumme[key]));
  }
}
