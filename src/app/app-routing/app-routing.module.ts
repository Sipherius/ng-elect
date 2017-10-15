import {NgModule} from '@angular/core';

import {RouterModule, PreloadAllModules, Routes, Router} from '@angular/router';

import {RoutesService} from "../services/routes.service";

const routes: Routes = [
    {
        "path": "",
        "redirectTo": "/questions",
        "pathMatch": "full"
    },
    {
        "path": "koalition",
        "loadChildren": "../mods/koalition/koalition.module#KoalitionModule"
    },
    {
        "path": "konsens",
        "loadChildren": "../mods/konsens/konsens.module#KonsensModule"
    },
    {
        "path": "questions",
        "loadChildren": "../mods/questions/questions.module#QuestionsModule"
    },
    {
        "path": "notfound",
        "loadChildren": "../mods/page-status/page-status.module#PageStatusModule"
    },
    {
        "path": "**",
        "redirectTo": "/notfound"
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {enableTracing: false, preloadingStrategy: PreloadAllModules}),
    ],
    exports: [
        RouterModule
    ],
    declarations: [
    ],
    providers: [
        RoutesService,
    ]
})
export class AppRoutingModule {
    constructor(private routes: RoutesService, private router: Router) {
        routes.getRoutes().subscribe((response) => {
            console.log(response)
            this.router.resetConfig(response);
        });
    }
}
