import { Component } from '@angular/core';
import { PrincipalComponent } from "../principal/principal.component";
import { CadatrarPessoaComponent } from "../principal/cadatrar-pessoa/cadatrar-pessoa.component";
@Component({
    selector: 'app-nav-admin',
    standalone: true,
    templateUrl: './nav-admin.component.html',
    styleUrl: './nav-admin.component.css',
    imports: [PrincipalComponent, CadatrarPessoaComponent]
})
export class NavAdminComponent {

}
