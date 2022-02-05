import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Advisor } from 'src/app/models/advisor';
import { AppUser, UserType } from 'src/app/models/app-user';
import { UserService } from 'src/app/services/users.service';
import { Session } from '../../models/session.model';

@Component({
  selector: 'app-advisors',
  templateUrl: './advisors.component.html',
  styleUrls: ['./advisors.component.scss'],
})
export class AdvisorsComponent implements OnInit {
  advisors: Advisor[] = [];
  advisors$: Observable<AppUser[]> = of([]);
  requestedSessions$: Observable<Session[]> = of( []);
  displayedColumns: string[] = ['advisor', 'profession'];
  advisorsLength = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.advisors$ = this.usersService.getAll()
      .pipe(
        map((users) => users.filter((user) => user.type === UserType.ADVISOR))
      );
  }
}
