import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { PrincipalComponent } from '../../principal/principal/principal.component';
import { RamaisPrincipalComponent } from '../../principal/ramais-principal/ramais-principal.component';
import { SobreComponent } from '../../views/sobre/sobre.component';
import { ContatoComponent } from '../../principal/contato/contato.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent
  },
  {
    path: 'ramal', component: RamaisPrincipalComponent
  },
  {
    path: 'contato/:id', component: ContatoComponent
  },
  {
    path: 'home', component: PrincipalComponent
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
