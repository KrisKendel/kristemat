import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableDatesComponent } from 'src/app/components/available-dates/available-dates.component';
import { RequestedSessionsComponent } from 'src/app/components/requested-sessions/requested-sessions.component';
import { UpcomingSessionsComponent } from 'src/app/components/upcoming-sessions/upcoming-sessions.component';
import { AuthGuardService } from 'src/app/services/authguard.service';
import { AppUserComponent } from './app-user.component';

const routes: Routes = [
  {
    path: '',
    component: AppUserComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'requested-sessions',
    component: RequestedSessionsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'available-dates',
    component: AvailableDatesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'upcoming',
    component: UpcomingSessionsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppUserRoutingModule {}
