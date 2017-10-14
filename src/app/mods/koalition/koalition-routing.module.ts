import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KoalitionComponent} from './koalition.component';

const routes : Routes = [
  {path: "", component: KoalitionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class KoalitionRoutingModule { }
