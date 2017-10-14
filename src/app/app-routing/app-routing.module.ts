import { NgModule } from '@angular/core';

import { RouterModule, PreloadAllModules , Routes } from '@angular/router';

import { KoalitionComponent } from '../mods/koalition/koalition.component';
import { KonsensComponent } from '../mods/konsens/konsens.component';
import { QuestionsComponent } from '../mods/questions/questions.component';

const routes: Routes = [
  {
    path: 'koalition',
    component: KoalitionComponent,
  },
  {
    path: 'konsens',
    component: KonsensComponent,
  },
  {
    path: 'questions',
    component: QuestionsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: PreloadAllModules}),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

//export const routingComponents = [KoalitionComponent, KonsensComponent, QuestionsComponent];