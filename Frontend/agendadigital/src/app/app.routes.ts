import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AdminComponent } from './admin/admin.component';
import { SobreComponent } from './sobre/sobre.component';


export const routes: Routes = [

    {
        path: 'principal',
        component: PrincipalComponent
    },

    {
        path:'admin',
        component: AdminComponent
    },
    {
        path:'sobre',
        component: SobreComponent
    }
    
];
