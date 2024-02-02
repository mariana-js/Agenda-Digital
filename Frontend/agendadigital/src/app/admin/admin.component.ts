import { Component } from '@angular/core';
import { NavAdminComponent } from '../nav-admin/nav-admin.component';
import { PrincipalComponent } from "../principal/principal.component";
import { SetoresComponent } from "./setores/setores.component";
import { RamaisComponent } from "./ramais/ramais.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { ContatosHideComponent } from "./contatos-hide/contatos-hide.component";

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [NavAdminComponent, PrincipalComponent, SetoresComponent, RamaisComponent, UsuariosComponent, ContatosHideComponent]
})
export class AdminComponent {

}
