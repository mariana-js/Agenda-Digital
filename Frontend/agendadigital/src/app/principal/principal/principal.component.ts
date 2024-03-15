import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Contato } from '../../models/contato';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  imports: [HttpClientModule, NavAniversariantesComponent, NgFor]
})
export class PrincipalComponent {
  readonly url: string;
  contatos: Contato[] = [];
  amount: number = 0;

  constructor(private http: HttpClient, private router: Router) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getContatos();
  }

  getContatos() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatos = resultados.filter(contato => contato.flag_privado === false);
        this.amount = this.contatos.length;
        if (this.amount === 0) {
          console.log("Erro ao trazer os contatos!")
        }
      });

  }

  informacoes() {
    this.router.navigate(['/contato']);

  }


}
