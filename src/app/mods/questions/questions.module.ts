import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import {
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatSelectModule,
  MatFormFieldModule,
  MatRadioModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressBarModule,
  MatChipsModule,
  MatGridListModule
} from '@angular/material';

import { QuestionsComponent } from './questions.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsService } from '../../services/questions.service';

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FormsModule,
    HttpModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    MatGridListModule,
  ],
  providers: [QuestionsService]
})
export class QuestionsModule {
}
