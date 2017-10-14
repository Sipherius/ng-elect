import { NgModule } from '@angular/core';
import {MatListModule, MatButtonModule, MatIconModule, MatIconRegistry} from '@angular/material';

@NgModule({
  imports: [
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [
    MatIconRegistry
  ]
})
export class AppMaterialModule { }
