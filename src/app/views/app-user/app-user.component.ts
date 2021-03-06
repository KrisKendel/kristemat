import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Session } from 'src/app/models/session.model';
import { AppUser } from 'src/app/models/app-user';
import { UserService } from 'src/app/services/users.service';
import { UserEditComponent } from '../../components/user-edit/user-edit.component';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss'],
})
export class AppUserComponent implements OnInit {
  user$: Observable<AppUser>;
  requestedSessions: Session[] = [];
  subList$: Subscription[] = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public translateService: TranslateService,
    public dateAdapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.translateService.currentLang = 'en-GB';
    this.user$ = this.userService.getActiveUser();
  }

  openEditProfileDialog() {
    const dialogRef = this.dialog.open(UserEditComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(() => {
      this.user$ = this.userService.getActiveUser();
    })
  }
}
