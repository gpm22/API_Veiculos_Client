import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';

export const routes: Routes = [
    {path:'', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', title:"home", component: HomeComponent},
    {path: 'vehicles', title:'vehicles', component: VehiclesComponent},
    {path: 'user-info', title: 'user info', component: UserInfoComponent},
    {path: 'unauthorized', title: 'unauthorized', component: UnauthorizedComponent},
    {path: '**', title: "not found", component: NotFoundComponent}
];
