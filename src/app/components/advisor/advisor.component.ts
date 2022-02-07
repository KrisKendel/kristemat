import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Advisor } from 'src/app/models/advisor';
import { Session, SessionStatus } from 'src/app/models/session.model';
import { UserService } from 'src/app/services/users.service';
import { SendSessionRequestComponent } from '../dialogs/send-session-request/send-session-request.component';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.scss'],
})
export class AdvisorComponent implements OnInit, OnDestroy {
  userId: string;
  advisor$: Observable<Advisor>;
  destroyed$: Subject<boolean> = new Subject<boolean>();
  sessions: Session[] = [];
  sessions$: Observable<any[]> = of([]);
  reformatDate: string;
  displayedColumns: string[] = ['date', 'makeRequest', 'status'];
  dataSource: any;
  advisorsLength = 0;
  pageSize = 5;
  sub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSessions();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getSessions() {
    this.userId = this.route.snapshot.params.userid;
    //combine those observables!
    this.advisor$ = this.userService.getAdvisorById(this.userId);
    this.sessions$ = this.userService.getAdvisorById(this.userId)
      .pipe(
        takeUntil(this.destroyed$),
        map(
          (user) => {
            return user.sessions.filter(session => {
              if (session.status === SessionStatus.AVAILABLE) {
                session.statusString = 'Available';
              } else if (session.status === SessionStatus.REQUESTED) {
                session.statusString = 'Requested';
              }
              return session.status === SessionStatus.AVAILABLE || session.status === SessionStatus.REQUESTED;
            });
          })
      );
  }

  openSessionRequestDialog(date: Date, id: string) {
    const matDialog = this.dialog.open(SendSessionRequestComponent, {
      width: '640px',
      disableClose: true,
      data: { ownerId: this.userId, date, sessionId: id },
    });

    matDialog.afterClosed().subscribe(() => {
      this.getSessions();
    });
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
