import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PrincipalComponent } from "./principal/principal.component";
import { HeadComponent } from "./head/head.component";
import { FooterComponent } from "./footer/footer.component";
import { NavAdminComponent } from "./nav-admin/nav-admin.component";
import { AdminComponent } from './admin/admin.component';
import { SobreComponent } from './sobre/sobre.component';
import { AniversariantesComponent } from './principal/aniversariantes/aniversariantes.component';
import { PessoaComponent } from './principal/pessoa/pessoa.component';
import { CadatrarPessoaComponent } from './principal/cadatrar-pessoa/cadatrar-pessoa.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',

    imports: [CommonModule, RouterOutlet, PrincipalComponent, HeadComponent, FooterComponent, NavAdminComponent, AdminComponent, SobreComponent, AniversariantesComponent, PessoaComponent, CadatrarPessoaComponent]
})

export class AppComponent  {

}
