import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  hide = true;
  hideConfirmation = true;

  constructor(
    private registerService: RegistrationService,
    private router: Router,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
      this.checkPasswords
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  registrationProcess() {
    if (this.formGroup.valid) {
      this.registerService
        .post(JSON.stringify(this.formGroup.value))
        .subscribe((res) => {
          this.snackBarService.createSnackBar('success', res.message);
        },
          (err) => {
            console.log(err);
            this.snackBarService.createSnackBar('error', err.statusText);
          }
        )
      this.router.navigate(['/login']);
    }
  }
}
