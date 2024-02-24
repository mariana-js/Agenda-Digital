import { Component } from '@angular/core';
import { NavAdminComponent } from "../../nav-admin/nav-admin.component";
import { Router } from '@angular/router';
@Component({
    selector: 'app-contatos-hide',
    standalone: true,
    templateUrl: './contatos-hide.component.html',
    styleUrl: './contatos-hide.component.css',
    imports: [NavAdminComponent]
})
export class ContatosHideComponent {
    constructor(private router: Router) {}

  navegarParaAbout() {
    this.router.navigate(['/contatos-ocultos']);
  }
}
