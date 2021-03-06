import { Component, OnDestroy, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { UserService } from 'src/app/services/users.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { SessionStatus } from 'src/app/models/session.model';
import { MatDialog } from '@angular/material/dialog';
import { AcceptSessionComponent } from 'src/app/components/dialogs/accept-session/accept-session.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendar = Calendar.name;
  loaded: boolean;
  sessionRequests: any = [];
  destroyed$: Subject<boolean> = new Subject<boolean>();
  error: Error;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false
    },
    eventClick: this.handleEventClick.bind(this),
    height: 650,
    selectable: true,
    progressiveEventRendering: true,
  };
  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSessions();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  async getSessions() {
    this.userService
      .getActiveUser()
      .pipe(
        takeUntil(this.destroyed$),
        map((el) => el.sessions))
      .pipe(
        tap((sessions) => sessions.forEach(async (el) => {
          switch (el.status) {
            case SessionStatus.AVAILABLE:
              el.title = 'Available';
              el.color = 'green';
              break;
            case SessionStatus.REQUESTED:
              el.title = 'Requested';
              el.color = 'yellow';
              break;
            case SessionStatus.ACCEPTED:
              el.title = 'Accepted'
              el.color = 'blue';
              break;
            case SessionStatus.REJECTED:
              el.title = 'Rejected';
              el.color = 'red';
              break;
            case SessionStatus.FINISHED:
              el.title = 'Finished';
              el.color = 'gray';
              break;
            default:
          }
        }))
      )
      .subscribe(
        (sessions) => {
          this.calendarOptions.events = sessions;
          this.loaded = true;
        },
        (error) => this.error = error
      );
  }

  handleEventClick(arg) {
    if (arg.event._def.extendedProps.status === SessionStatus.REQUESTED) {
      this.openAcceptDialog(arg.event._def.publicId);
    } else if (arg.event._def.extendedProps.status === SessionStatus.ACCEPTED) {
      // show info about session
      alert(arg.event._def.extendedProps.requestedAt);
    }
  }

  openAcceptDialog(id: string) {
    const acceptDialog = this.dialog.open(AcceptSessionComponent, {
      width: '640px',
      data: { sessionId: id, fromCalendar: true },
    });

    acceptDialog.afterClosed().subscribe(() => {
      this.getSessions();
    });
  }
}

