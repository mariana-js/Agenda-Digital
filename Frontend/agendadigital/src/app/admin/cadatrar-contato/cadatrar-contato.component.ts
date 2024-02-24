import { Component } from '@angular/core';
import { NavAdminComponent } from "../../nav-admin/nav-admin.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-cadatrar-contato',
    standalone: true,
    templateUrl: './cadatrar-contato.component.html',
    styleUrl: './cadatrar-contato.component.css',
    imports: [NavAdminComponent]
})
export class CadatrarContatoComponent {
    constructor(private router: Router) {}

  navegarParaAbout() {
    this.router.navigate(['/cadastrar-contato']);
  }
}


