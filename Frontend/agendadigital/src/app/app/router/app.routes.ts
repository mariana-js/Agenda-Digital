import { Routes } from '@angular/router';
import { AdminContatosComponent } from '../../admin/admin-contatos/admin-contatos.component';
import { CadatrarContatoComponent } from '../../admin/cadatrar-contato/cadatrar-contato.component';
import { RamaisComponent } from '../../admin/ramais/ramais.component';
import { SetoresComponent } from '../../admin/setores/setores.component';
import { UsuariosComponent } from '../../admin/usuarios/usuarios.component';
import { ContatoComponent } from '../../principal/contato/contato.component';
import { PrincipalComponent } from '../../principal/principal/principal.component';
import { LoginComponent } from '../../views/login/login.component';
import { SobreComponent } from '../../views/sobre/sobre.component';
import { RamaisPrincipalComponent } from '../../principal/ramais-principal/ramais-principal.component';

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
    path: 'cadastrar-contato',
    component: CadatrarContatoComponent
  },
  {
    path: 'contatos-admin',
    component: AdminContatosComponent
  },
  {
    path: 'contato-admin/:id',
    component: CadatrarContatoComponent
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
