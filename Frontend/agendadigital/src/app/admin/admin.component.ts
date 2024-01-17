import { Component } from '@angular/core';
import { NavAdminComponent } from '../nav-admin/nav-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
