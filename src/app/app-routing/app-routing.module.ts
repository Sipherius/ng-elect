import { NgModule } from '@angular/core';

import { RouterModule, PreloadAllModules , Routes } from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: '/questions', pathMatch: "full"},
  {path: "koalition", loadChildren: '../mods/koalition/koalition.module#KoalitionModule'},
  {path: "konsens", loadChildren: '../mods/konsens/konsens.module#KonsensModule'},
  {path: "questions", loadChildren: '../mods/questions/questions.module#QuestionsModule'},
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
