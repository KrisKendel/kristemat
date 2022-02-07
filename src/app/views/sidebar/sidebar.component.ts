import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUser, UserType } from 'src/app/models/app-user';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  activeUser: AppUser;
  canSeeAdvisorsList = false;
  avatar: string;
  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.checkUserType();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  checkUserType() {
    this.userService.getActiveUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.activeUser = user;
        if (this.activeUser.type === UserType.CLIENT) {
          this.canSeeAdvisorsList = true;
        } else {
          this.canSeeAdvisorsList = false;
        }
      },
        (error) => console.log(error)
      );
  }
}
