import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {PageStatusComponent} from './page-status.component';
import {PageStatusRoutingModule} from './page-status-routing.module';

@NgModule({
    declarations: [PageStatusComponent],
    imports: [
        CommonModule,
        PageStatusRoutingModule,
        FormsModule,
        HttpModule,
    ],
    providers: []
})
export class PageStatusModule {
}
