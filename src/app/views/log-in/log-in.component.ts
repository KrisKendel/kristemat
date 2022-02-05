import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  formGroup: FormGroup;
  hide = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.loginService
        .post(JSON.stringify(this.formGroup.value))
        .subscribe((jwt) => {
          localStorage.setItem('jwt', jwt.token);
          localStorage.setItem('username', jwt.username);
          localStorage.setItem('avatar', jwt.avatar);
          this.router.navigate(['/profile']);
        },
          (err) => {
            this.snackBarService.createSnackBar('error', err.error.title);
          }
        );
    }
  }
}
