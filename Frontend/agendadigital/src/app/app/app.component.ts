import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavAdminComponent } from "../admin/nav-admin/nav-admin.component";
import { FooterComponent } from "../views/footer/footer.component";
import { HeadComponent } from "../views/head/head.component";
import { SobreComponent } from '../views/sobre/sobre.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

  imports: [CommonModule, RouterOutlet, HeadComponent, FooterComponent, NavAdminComponent, SobreComponent]
})

export class AppComponent {

}
