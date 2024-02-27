import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";

@Component({
  selector: 'app-cadatrar-contato',
  standalone: true,
  templateUrl: './cadatrar-contato.component.html',
  styleUrl: './cadatrar-contato.component.css',
  imports: [NavAdminComponent]
})
export class CadatrarContatoComponent {
  constructor(private router: Router) { }

  navegarParaAbout() {
    this.router.navigate(['cadastrar-contato']);
  }
}


