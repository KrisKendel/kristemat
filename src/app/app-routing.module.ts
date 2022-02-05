import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './views/log-in/log-in.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/profile', pathMatch: 'full'
  },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    loadChildren: () =>
      import('./views/app-user/app-user.module').then((m) => m.AppUserModule),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./views/calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: 'my-notes',
    loadChildren: () =>
      import('./views/my-notes/my-notes.module').then((m) => m.MyNotesModule),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./views/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'advisors',
    loadChildren: () =>
      import('./views/advisors/advisors.module').then((m) => m.AdvisorsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
