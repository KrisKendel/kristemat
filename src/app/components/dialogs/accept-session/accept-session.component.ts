import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SessionService } from 'src/app/services/session.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-accept-session',
  templateUrl: './accept-session.component.html',
  styleUrls: ['./accept-session.component.scss'],
})
export class AcceptSessionComponent implements OnInit, OnDestroy {
  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  // TODO Combine warning dialogs to one ...
  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


  onAcceptClick() {
    this.sessionService
      .acceptSessionRequest(this.data.sessionId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.snackBarService.createSnackBar('success', res.message);
      },
        (err) => {
          this.snackBarService.createSnackBar('error', err.statusText);
        }
      );
    this.dialog.closeAll();
  }

  closeDialog(): void {
    if (this.data.fromCalendar) {
      this.sessionService
        .rejectSessionRequest(this.data.sessionId)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.snackBarService.createSnackBar('success', res.message);
        },
          (err) => {
            this.snackBarService.createSnackBar('error', err.statusText);
          }
        );
    }
    this.dialog.closeAll();
  }
}
