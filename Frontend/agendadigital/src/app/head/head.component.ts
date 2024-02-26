import { Component } from '@angular/core';
import { AdminComponent } from "../admin/admin.component";
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
import { PessoaComponent } from "../principal/pessoa/pessoa.component";
import { PrincipalComponent } from "../principal/principal.component";
import { SobreComponent } from "../sobre/sobre.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-head',
    standalone: true,
    templateUrl: './head.component.html',
    styleUrl: './head.component.css',
    imports: [AdminComponent, PrincipalComponent, NavAdminComponent, SobreComponent, NavAniversariantesComponent, PessoaComponent]
})
export class HeadComponent {
  constructor(private router: Router) {}

  navegarParaAbout() {
    this.router.navigate(['/principal']);
  }
}
