import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  private minLength = {
    title: 6,
    text: 25,
  };

  constructor() { }

  getMinLength(): { title: number, text: number } {
    return this.minLength;
  }

  passwordsMatch(password: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (password.value !== control.value) {
        return { passwordsMatch: true };
      }
      return null;
    };
  }

  spaceValidator(query: string = ' '): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.includes(query)) {
        return { space: true };
      }
      return null;
    };
  }

  trimValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.trim().length < minLength) {
        return {
          trim: {
            requiredLength: minLength,
            actualLength: control.value.trim().length,
          }
        };
      }
      return null;
    };
  }

  blanksReplacer(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.includes('  ')) {
        control.setValue(control.value.replace('  ', ' '));
      }
      return null;
    };
  }
}
