import { NgModule } from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';
import {PageStatusComponent} from './page-status.component';

const routes : Routes = [
  {path: "", component: PageStatusComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PageStatusRoutingModule { }
