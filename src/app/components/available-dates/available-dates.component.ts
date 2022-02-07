import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Session, SessionStatus } from 'src/app/models/session.model';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/users.service';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-available-dates',
  templateUrl: './available-dates.component.html',
  styleUrls: ['./available-dates.component.scss'],
})
export class AvailableDatesComponent implements OnInit, OnDestroy {
  dateControl: FormControl;
  formGroup: FormGroup;
  dataSource$: Observable<Session[]>;
  minDate = new Date();
  destroyed$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private sessionService: SessionService,
    private snackBarService: SnackBarService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAvailableDates();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initForm() {
    this.formGroup = new FormGroup({
      availableDate: new FormControl('', Validators.required),
    });
  }

  getAvailableDates() {
    this.dataSource$ = this.userService.getActiveUser().pipe(
      takeUntil(this.destroyed$),
      map((user) => user.sessions.filter((session) => session.status === SessionStatus.AVAILABLE))
    );
  }

  addAvailableDate() {
    const availableDate = this.formGroup.value.availableDate;
    this.sessionService
      .setAvailableDate(availableDate)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: any) => {
        this.snackBarService.createSnackBar('success', res.message);
        this.getAvailableDates();
        this.formGroup.reset();
      },
        (err) => {
          this.snackBarService.createSnackBar('success', err.statusText);
          this.formGroup.reset();
        }
      );
  }
}
