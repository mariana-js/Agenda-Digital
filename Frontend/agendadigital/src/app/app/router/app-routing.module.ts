import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadatrarContatoComponent } from '../../admin/cadatrar-contato/cadatrar-contato.component';
import { ContatosHideComponent } from '../../admin/contatos-hide/ContatosHideComponent';
import { RamaisComponent } from '../../admin/ramais/ramais.component';
import { SetoresComponent } from '../../admin/setores/setores.component';
import { UsuariosComponent } from '../../admin/usuarios/usuarios.component';
import { PrincipalComponent } from '../../principal/principal/principal.component';
import { LoginComponent } from '../../views/login/login.component';
import { SobreComponent } from '../../views/sobre/sobre.component';


const routes: Routes = [
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
    path: 'contatos-admin',
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

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
