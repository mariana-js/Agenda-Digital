import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipalComponent } from "../principal/principal.component";

@Component({
  selector: 'app-nav-admin',
  standalone: true,
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css',
  imports: [PrincipalComponent]
})
export class NavAdminComponent {

  imagePath: string = 'assets/Imagens/home-b.png';

  changeImage(newImagePath: string): void {
    this.imagePath = newImagePath;
  }

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
