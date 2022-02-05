import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyNotesRoutingModule } from './my-notes-routing.module';
import { MyNotesComponent } from './my-notes.component';

@NgModule({
  declarations: [MyNotesComponent],
  imports: [MyNotesRoutingModule, SharedModule, CommonModule],
})
export class MyNotesModule {}
