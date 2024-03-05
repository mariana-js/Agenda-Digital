import { Component } from '@angular/core';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [HttpClientModule, NavAniversariantesComponent]
})
export class PrincipalComponent {
  readonly url : string;

  constructor(private http : HttpClient) {
    this.url = 'http://localhost:8080';
  }

  getContatos() {

    this.http.get(`${ this.url }/pessoa`)
           .subscribe(resultado => console.log(resultado));
  }
}
