import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-user-info-display',
  templateUrl: './user-info-display.component.html',
  styleUrls: ['./user-info-display.component.scss'],
})
export class UserInfoDisplayComponent implements OnInit, OnDestroy {
  avatar: string;
  userName: string;
  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private globalService: GlobalService) {
    this.globalService.avatarChange
      .pipe(
        takeUntil(this.destroyed$))
      .subscribe((avatar) => {
        this.avatar = avatar;
      });
  }

  ngOnInit(): void {
    this.getInfo();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getInfo(): void {
    this.userName = localStorage.getItem('username');
    this.avatar = localStorage.getItem('avatar');
  }
}
