import {NgModule} from '@angular/core';

import {RouterModule, PreloadAllModules, Routes, Router} from '@angular/router';
//import {getRouteComponents} from '../utils/route';

const routes: Routes = [
    {path: "", redirectTo: '/questions', pathMatch: "full"},
    {path: "koalition", loadChildren: '../mods/koalition/koalition.module#KoalitionModule'},
    {path: "konsens", loadChildren: '../mods/konsens/konsens.module#KonsensModule'},
    {path: "questions", loadChildren: '../mods/questions/questions.module#QuestionsModule'},
    {path: 'notfound', loadChildren: '../mods/page-status/page-status.module#PageStatusModule'},
    {path: '**', redirectTo: '/notfound'}
];

//const routeComponents = getRouteComponents(routes);

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {enableTracing: false, preloadingStrategy: PreloadAllModules}),
    ],
    exports: [
        RouterModule
    ],
    declarations: [
    ]
})
export class AppRoutingModule {
    constructor() {
    }
}
