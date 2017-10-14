import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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


import { KoalitionService } from '../services/koalition.service';
import { KonsensService } from '../services/konsens.service';
import { QuestionsService } from '../services/questions.service';

import {KoalitionComponent} from './koalition/koalition.component';
import {KonsensComponent} from './konsens/konsens.component';
import {QuestionsComponent} from './questions/questions.component';

//import { AppRoutingModule } from '../app-routing.module';

@NgModule({

    declarations: [
        KoalitionComponent,
        KonsensComponent,
        QuestionsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
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
    providers: [ KonsensService , QuestionsService, KoalitionService]
})
export class BaseModule {
}
