import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-reject-session',
  templateUrl: './reject-session.component.html',
  styleUrls: ['./reject-session.component.scss'],
})
export class RejectSessionComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  // TODO Combine warning dialogs to one ...
  ngOnInit(): void { }

  onRejectClick() {
    this.sessionService
      .rejectSessionRequest(this.data.sessionId)
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
    this.dialog.closeAll();
  }
}
