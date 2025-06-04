
import { Routes } from '@angular/router';
import { AdminContatosComponent } from '../admin/admin-contatos/admin-contatos.component';
import { GerenciarContatoComponent } from '../admin/gerenciar-contato/gerenciar-contato.component';
import { RamaisComponent } from '../admin/ramais/ramais.component';
import { SetoresComponent } from '../admin/setores/setores.component';
import { UsuariosComponent } from '../admin/usuarios/usuarios.component';
import { AlterarsenhaComponent } from '../login/alterarsenha/alterarsenha.component';
import { LoginComponent } from '../login/login/login.component';
import { ContatoComponent } from '../principal/contato/contato.component';
import { PrincipalComponent } from '../principal/principal/principal.component';
import { RamaisPrincipalComponent } from '../principal/ramais-principal/ramais-principal.component';
import { SobreComponent } from '../views/sobre/sobre.component';

export const routes: Routes = [

  { path: '', component: PrincipalComponent },
  { path: 'home', component: PrincipalComponent },
  { path: 'contato/:id', component: ContatoComponent },
  { path: 'ramal', component: RamaisPrincipalComponent },
  { path: 'contatos-admin', component: AdminContatosComponent },
  { path: 'cadastrar-contato', component: GerenciarContatoComponent },
  { path: 'contato-admin/:id', component: GerenciarContatoComponent },
  { path: 'ramais', component: RamaisComponent },
  { path: 'setores', component: SetoresComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'alterar-senha', component: AlterarsenhaComponent },
  { path: 'sobre', component: SobreComponent }

];
