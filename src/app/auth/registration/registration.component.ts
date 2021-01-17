import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ToasterService } from './../../shared/services/toaster.service';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Output() selectLoginTab: EventEmitter<void> = new EventEmitter();

  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null),
      nickName: new FormControl(null, [Validators.required]),
    });
    this.form.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordsMatch(this.form.controls.password)
    ]);
  }

  onSubmit(): void {
    const { email, password, nickName } = this.form.value;
    const registrationData = { email, password, nickName };
    this.authService.registration(registrationData).subscribe(
      res => {
        this.toasterService.success('Account was created successfully!');
        this.selectLoginTab.emit();
      }
    );
  }

  // The confirmPassword field validator
  passwordsMatch(password: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (password.value !== control.value) {
        return { passwordsMatch: true };
      }
      return null;
    };
  }
}
