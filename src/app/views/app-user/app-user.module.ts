import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvailableDatesComponent } from 'src/app/components/available-dates/available-dates.component';
import { RequestedSessionsComponent } from 'src/app/components/requested-sessions/requested-sessions.component';
import { UpcomingSessionsComponent } from 'src/app/components/upcoming-sessions/upcoming-sessions.component';
import { NamePipe } from 'src/app/pipes/name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppUserRoutingModule } from './app-user-routing.module';
import { AppUserComponent } from './app-user.component';



@NgModule({
  declarations: [
    AppUserComponent,
    RequestedSessionsComponent,
    AvailableDatesComponent,
    UpcomingSessionsComponent,
    NamePipe
  ],
  imports: [AppUserRoutingModule, SharedModule, CommonModule],
})
export class AppUserModule { }
