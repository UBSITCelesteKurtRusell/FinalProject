import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
    //{path: 'kantoregion', component: KantoRegion},

    //{path:'', redirectTo:'home', pathMatch: 'full'}
    { path: '', component: HomeComponent }
];