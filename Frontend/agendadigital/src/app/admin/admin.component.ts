import { Component } from '@angular/core';
import { NavAdminComponent } from '../nav-admin/nav-admin.component';
import { PrincipalComponent } from "../principal/principal.component";

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [NavAdminComponent, PrincipalComponent]
})
export class AdminComponent {

}
