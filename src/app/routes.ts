// Importations de base
import {Routes} from '@angular/router';
import {Component} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';

// Composant Routes
@Component({
    selector: "app-routes",
    imports: [],
    template: `<p>routes fonctionne.</p>`
})

export class RoutesComponent{

}

// Array de routes
const routeConfig: Routes = 
[
    {   path: "", 
        component: HomeComponent,
        title: "Home page"
    },

    {
        path: "details/:id",
        component: DetailsComponent,
        title: "Home details"
    }
];

export default routeConfig;