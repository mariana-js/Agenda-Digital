import { Component } from '@angular/core';
import { AdminComponent } from "../admin/admin.component";
import { PrincipalComponent } from "../principal/principal.component";
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { SobreComponent } from "../sobre/sobre.component";

@Component({
    selector: 'app-head',
    standalone: true,
    templateUrl: './head.component.html',
    styleUrl: './head.component.css',
    imports: [AdminComponent, PrincipalComponent, NavAdminComponent, SobreComponent]
})
export class HeadComponent {

}