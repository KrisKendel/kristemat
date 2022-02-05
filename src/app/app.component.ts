import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  user: string;
  userType: boolean;
  options: FormGroup;
  languageForm: FormGroup;

  languages = [
    {
      value: 'English'
    },
    {
      value: 'German',
    }
  ];

  constructor(
    public router: Router,
    public userService: UserService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.translateService.setDefaultLang('en');
    this.formInit();
    this.languageForm.get('language').setValue('English');
    setInterval(() => {
      this.user = localStorage.getItem('username');
    }, 200);

    if (this.user) {
      clearInterval();
    }
  }

  onSelectLanguage() {
    if (this.languageForm.get('language').value === 'English') {
      this.translateService.use('en');
    } else if (this.languageForm.get('language').value === 'German') {
      this.translateService.use('de');
    }
  }

  logout() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
  }

  formInit() {
    this.languageForm = new FormGroup({
      language: new FormControl(),
    });
  }
}
