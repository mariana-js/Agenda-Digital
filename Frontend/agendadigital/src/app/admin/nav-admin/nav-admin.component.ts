import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  standalone: true,
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css',
  imports: []
})
export class NavAdminComponent {

  constructor(private router: Router) { }

  navegarParaHome() {
    this.router.navigate(['/']);
  }

  navegarParaRamais() {
    this.router.navigate(['/ramais']);
  }

  navegarParaSetores() {
    this.router.navigate(['/setores']);
  }
  navegarParaUsuarios() {
    this.router.navigate(['/usuarios']);
  }
  navegarParaContatosHide() {
    this.router.navigate(['/contatos-ocultos']);
  }
  navegarParaAddContato() {
    this.router.navigate(['/cadastrar-contato']);
  }

}