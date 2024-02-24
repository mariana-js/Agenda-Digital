import { Component } from '@angular/core';
import { NavAdminComponent } from "../../nav-admin/nav-admin.component";
import { Router } from '@angular/router';
@Component({
    selector: 'app-usuarios',
    standalone: true,
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.css',
    imports: [NavAdminComponent]
})
export class UsuariosComponent {
    constructor(private router: Router) {}

  navegarParaAbout() {
    this.router.navigate(['/usuarios']);
  }
}
