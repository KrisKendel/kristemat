import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { UserService } from 'src/app/services/users.service';
import { map, tap } from 'rxjs/operators';
import { SessionStatus } from 'src/app/models/session.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendar = Calendar.name;
  loaded: boolean;
  sessionRequests: any = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    height: 650,
    selectable: true,
    progressiveEventRendering: true,
  };
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService
      .getActiveUser()
      .pipe(map((el) => el.sessions))
      .pipe(
        tap((sessions) => sessions.forEach((el) => {
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
              el.title = 'Accepted';
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
        (error) => console.log(error)
      );
  }

  handleDateClick(arg) {
    // dodat slobodne dane u kalendar, ako advisor
    alert('date click! ' + arg.dateStr);
  }
}
