import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SessionRequest } from 'src/app/models/session-request.model';
import { SessionService } from 'src/app/services/session.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-send-session-request',
  templateUrl: './send-session-request.component.html',
  styleUrls: ['./send-session-request.component.scss'],
})
export class SendSessionRequestComponent implements OnInit, OnDestroy {
  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: SessionRequest
  ) { }
  // TODO Combine warning dialogs to one ...
  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  sendSessionReguest() {
    this.sessionService
      .sessionRequestPost(this.data)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: any) => {
        this.snackBarService.createSnackBar('success', res.message);
        this.dialog.closeAll();
      },
        (err) => {
          this.snackBarService.createSnackBar('error', err.statusText);
        }
      );
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
