import {NgModule} from '@angular/core';

import {RouterModule, PreloadAllModules, Routes, Router} from '@angular/router';
//import {getRouteComponents} from '../utils/route';

import {RoutesService} from "../services/routes.service";

const routes: Routes = [];

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
            this.router.resetConfig(response);
        });
    }
}
