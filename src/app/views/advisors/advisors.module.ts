import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdvisorComponent } from 'src/app/components/advisor/advisor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdvisorsRoutingModule } from './advisors-routing.module';
import { AdvisorsComponent } from './advisors.component';

@NgModule({
  declarations: [AdvisorsComponent, AdvisorComponent],
  imports: [AdvisorsRoutingModule, CommonModule, SharedModule],
})
export class AdvisorsModule {}
