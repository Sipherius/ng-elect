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

import { KonsensComponent } from './konsens.component';
import { KonsensRoutingModule } from './konsens-routing.module';
import { KonsensService } from '../../services/konsens.service';

@NgModule({
  declarations: [KonsensComponent],
  imports: [
    CommonModule,
    KonsensRoutingModule,
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
  providers: [KonsensService]
})
export class KonsensModule { }
