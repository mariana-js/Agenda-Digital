import { Component } from '@angular/core';
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

}
