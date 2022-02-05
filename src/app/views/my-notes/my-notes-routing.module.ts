import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/authguard.service';
import { MyNotesComponent } from './my-notes.component';

const routes: Routes = [
  {
    path: '',
    component: MyNotesComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyNotesRoutingModule {}
