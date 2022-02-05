import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Session, SessionStatus } from 'src/app/models/session.model';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-available-dates',
  templateUrl: './available-dates.component.html',
  styleUrls: ['./available-dates.component.scss'],
})
export class AvailableDatesComponent implements OnInit {
  dateControl: FormControl;
  formGroup: FormGroup;
  dataSource$: Observable<Session[]>;
  minDate = new Date();
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

  initForm() {
    this.formGroup = new FormGroup({
      availableDate: new FormControl('', Validators.required),
    });
  }

  getAvailableDates() {
    this.dataSource$ = this.userService.getActiveUser().pipe(
      map((user) => user.sessions.filter((session) => session.status === SessionStatus.AVAILABLE))
    );
  }

  addAvailableDate() {
    const availableDate = this.formGroup.value.availableDate;
    this.sessionService
      .setAvailableDate(availableDate)
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
