import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvisorComponent } from 'src/app/components/advisor/advisor.component';
import { AuthGuardService } from 'src/app/services/authguard.service';
import { AdvisorsComponent } from './advisors.component';

const routes: Routes = [
  {
    path: '',
    component: AdvisorsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':userid',
    component: AdvisorComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvisorsRoutingModule {}
