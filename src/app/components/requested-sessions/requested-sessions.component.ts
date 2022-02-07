import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Session, SessionStatus } from '../../models/session.model';
import { AppUser } from 'src/app/models/app-user';
import { UserService } from 'src/app/services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AcceptSessionComponent } from '../dialogs/accept-session/accept-session.component';
import { RejectSessionComponent } from '../dialogs/reject-session/reject-session.component';
import { MatPaginator } from '@angular/material/paginator';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { forkJoin, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-requested-sessions',
  templateUrl: './requested-sessions.component.html',
  styleUrls: ['./requested-sessions.component.scss'],
})
export class RequestedSessionsComponent implements OnInit, OnDestroy {
  user: AppUser;
  requestedSessions: Session[] = [];
  displayedColumns: string[] = ['client', 'dateTime', 'action'];
  dataSource: any;
  sessionsLength = 0;
  pageSize = 5;
  destroyed$: Subject<boolean> = new Subject<boolean>()

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // TODO refactor
    this.getRequestedSessions().subscribe(
      (res) => {
        this.requestedSessions.push(...res);
        this.dataSource = new MatTableDataSource<Session>(
          this.requestedSessions
        );
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getRequestedSessions(): Observable<any> {
    return this.userService.getActiveUser().pipe(
      takeUntil(this.destroyed$),
      map((user) => {
        return user.sessions.filter(
          (session) =>
            session.participantId && session.status === SessionStatus.REQUESTED
        );
      })
    );
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAcceptDialog(e, id) {
    console.log(id);
    e.stopPropagation();
    const acceptDialog = this.dialog.open(AcceptSessionComponent, {
      width: '640px',
      data: { sessionId: id },
    });

    acceptDialog.afterClosed().subscribe(() => {
      this.requestedSessions.length = 0;
      this.getRequestedSessions();
    });
  }

  openRejectDialog(e, id) {
    e.stopPropagation();
    const rejectDialog = this.dialog.open(RejectSessionComponent, {
      width: '640px',
      data: { sessionId: id },
    });

    rejectDialog.afterClosed().subscribe(() => {
      this.requestedSessions.length = 0;
      this.getRequestedSessions();
    });
  }
}
