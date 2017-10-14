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

import { KoalitionComponent } from './koalition.component';
import { KoalitionRoutingModule } from './koalition-routing.module';
import { KoalitionService } from '../../services/koalition.service';

@NgModule({
  declarations: [KoalitionComponent],
  imports: [
    CommonModule,
    KoalitionRoutingModule,
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
  providers: [KoalitionService]
})
export class KoalitionModule { }
