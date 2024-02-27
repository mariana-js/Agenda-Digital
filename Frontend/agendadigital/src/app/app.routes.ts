import { Routes } from '@angular/router';
import { CadatrarContatoComponent } from './admin/cadatrar-contato/cadatrar-contato.component';
import { ContatosHideComponent } from './admin/contatos-hide/contatos-hide.component';
import { RamaisComponent } from './admin/ramais/ramais.component';
import { SetoresComponent } from './admin/setores/setores.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';
import { SobreComponent } from './sobre/sobre.component';
import { PrincipalComponent } from './principal/principal/principal.component';


export const routes: Routes = [

  {
    path: '', component: PrincipalComponent
  },

  {
    path: 'home', component: PrincipalComponent
  },

  {
    path: 'cadastrar-contato',
    component: CadatrarContatoComponent
  },
  {
    path: 'contatos-ocultos',
    component: ContatosHideComponent
  },
  {
    path: 'ramais',
    component: RamaisComponent
  },
  {
    path: 'setores',
    component: SetoresComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
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
