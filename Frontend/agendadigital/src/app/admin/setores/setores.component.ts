import { Component } from '@angular/core';
import { NavAdminComponent } from "../../nav-admin/nav-admin.component";
import { Router } from '@angular/router';
@Component({
    selector: 'app-setores',
    standalone: true,
    templateUrl: './setores.component.html',
    styleUrl: './setores.component.css',
    imports: [NavAdminComponent]
})
export class SetoresComponent {
    constructor(private router: Router) {}

  navegarParaAbout() {
    this.router.navigate(['/setores']);
  }
}
