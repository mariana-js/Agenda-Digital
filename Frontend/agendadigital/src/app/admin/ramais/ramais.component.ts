import { Component } from '@angular/core';
import { NavAdminComponent } from "../../nav-admin/nav-admin.component";
import { Router } from '@angular/router';
@Component({
    selector: 'app-ramais',
    standalone: true,
    templateUrl: './ramais.component.html',
    styleUrl: './ramais.component.css',
    imports: [NavAdminComponent]
})
export class RamaisComponent {
    constructor(private router: Router) {}

  navegarParaAbout() {
    this.router.navigate(['/ramais']);
  }
}
