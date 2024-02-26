import { Routes } from '@angular/router';
import { CadatrarContatoComponent } from './admin/cadatrar-contato/cadatrar-contato.component';
import { PrincipalComponent } from './principal/principal.component';
import { SobreComponent } from './sobre/sobre.component';
import { ContatosHideComponent } from './admin/contatos-hide/contatos-hide.component';
import { RamaisComponent } from './admin/ramais/ramais.component';
import { SetoresComponent } from './admin/setores/setores.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';


export const routes: Routes = [

  {
    path: '', component: PrincipalComponent
  },

  {
    path: 'principal', component: PrincipalComponent
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
    path: 'sobre',
    component: SobreComponent
  }


];
