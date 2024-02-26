import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
import { CadatrarContatoComponent } from '../admin/cadatrar-contato/cadatrar-contato.component';
import { SetoresComponent } from '../admin/setores/setores.component';

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [ NavAniversariantesComponent,CadatrarContatoComponent,SetoresComponent]
})
export class PrincipalComponent{
    constructor(private router: Router) {}

  navegarParaAbout() {
    this.router.navigate(['/']);
    this.router.navigate(['/setores']);
    this.router.navigate(['/cadastrar-contato']);
    console.log('navegando...')
  }
}
