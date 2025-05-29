import { Routes } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { ContatoComponent } from '../../principal/contato/contato.component';
import { PrincipalComponent } from '../../principal/principal/principal.component';
import { RamaisPrincipalComponent } from '../../principal/ramais-principal/ramais-principal.component';
import { SobreComponent } from '../../views/sobre/sobre.component';

export const routes: Routes = [

  {
    path: '', component: PrincipalComponent
  },

  {
    path: 'home', component: PrincipalComponent
  },
  {
    path: 'contato/:id', component: ContatoComponent
  },

  {
    path: 'ramal', component: RamaisPrincipalComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'sobre',
    component: SobreComponent
  }


];
