import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [ NavAniversariantesComponent]
})
export class PrincipalComponent{
    constructor(private router: Router) {}

  navegarParaAbout() {
    this.router.navigate(['/principal']);
  }
}
