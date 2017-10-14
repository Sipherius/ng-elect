import { NgModule } from '@angular/core';
import { Routes,
  RouterModule }        from '@angular/router';
import {KonsensComponent} from './konsens.component';

const routes : Routes = [
  {path: "", component: KonsensComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class KonsensRoutingModule { }
