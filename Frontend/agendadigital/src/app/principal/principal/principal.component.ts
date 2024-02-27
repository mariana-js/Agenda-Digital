import { Component } from '@angular/core';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [NavAniversariantesComponent]
})
export class PrincipalComponent {

}
