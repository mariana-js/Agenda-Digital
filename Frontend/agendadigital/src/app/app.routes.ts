import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AdminComponent } from './admin/admin.component';
import { SobreComponent } from './sobre/sobre.component';
import { CadatrarPessoaComponent } from './principal/cadatrar-pessoa/cadatrar-pessoa.component';

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
    },
    {
        path: 'add-contato',
        component: CadatrarPessoaComponent
    }
    
];
