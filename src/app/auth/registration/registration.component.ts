import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ValidatorsService } from './../../shared/validators/validators.service';
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
    private validatorsService: ValidatorsService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, this.validatorsService.spaceValidator(), Validators.minLength(8)]),
      confirmPassword: new FormControl(null),
      nickName: new FormControl(null, [Validators.required, this.validatorsService.spaceValidator()]),
    });
    this.form.get('confirmPassword')?.setValidators([
      Validators.required,
      this.validatorsService.passwordsMatch(this.form.controls.password),
    ]);
  }

  onSubmit(): void {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.form.get('password')?.setErrors({ passwordsMatch: true });
    } else {
      const { email, password, nickName } = this.form.value;
      const registrationData = { email, password, nickName };
      this.authService.registration(registrationData).subscribe(
        res => {
          this.toasterService.success('Account was created successfully!');
          this.selectLoginTab.emit();
        }
      );
    }
  }

}
