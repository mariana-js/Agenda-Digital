import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-nav-aniversariantes',
  standalone: true,
  templateUrl: './nav-aniversariantes.component.html',
  styleUrl: './nav-aniversariantes.component.css',
  imports: [NgFor, HttpClientModule]
})
export class NavAniversariantesComponent {
  readonly url: string;
  aniversariantes: Funcionario[] = [];


  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getAniversariantes();
  }

  getAniversariantes() {
    this.http.get<Funcionario[]>(`${this.url}/funcionario`)
      .subscribe(resultados => {
        this.aniversariantes = resultados.sort();
      });
  }
}
