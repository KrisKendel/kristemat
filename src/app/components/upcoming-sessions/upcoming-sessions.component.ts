import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Session, SessionStatus } from '../../models/session.model';
import { AppUser } from 'src/app/models/app-user';
import { UserService } from 'src/app/services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AcceptSessionComponent } from '../dialogs/accept-session/accept-session.component';
import { RejectSessionComponent } from '../dialogs/reject-session/reject-session.component';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-upcoming-sessions',
  templateUrl: './upcoming-sessions.component.html',
  styleUrls: ['./upcoming-sessions.component.scss'],
})
export class UpcomingSessionsComponent implements OnInit, OnDestroy {
  user: AppUser;
  upcomingSessions: Session[] = [];
  displayedColumns: string[] = ['userName', 'date'];
  dataSource: MatTableDataSource<Session>;
  destroyed$: Subject<boolean> = new Subject<boolean>();
  sessionsLength = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUpcomingSessions().subscribe(res => {
      this.upcomingSessions.push(...res);
      this.dataSource = new MatTableDataSource<Session>(this.upcomingSessions);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getUpcomingSessions(): Observable<any> {
    return this.userService.getActiveUser()
      .pipe(
        takeUntil(this.destroyed$),
        map((user) => user.sessions.filter(t => t.participantId && t.status === SessionStatus.ACCEPTED))
      )
  }

  openChat(id: string) {
    this.router.navigateByUrl(`chat/${id}`, { skipLocationChange: true });
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAcceptDialog(e, id) {
    e.stopPropagation();
    this.dialog.open(AcceptSessionComponent, {
      width: '640px',
      data: { sessionId: id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getUpcomingSessions();
    });
  }

  openRejectDialog(e, id) {
    e.stopPropagation();
    this.dialog.open(RejectSessionComponent, {
      width: '640px',
      data: { sessionId: id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getUpcomingSessions();
    });
  }
}
