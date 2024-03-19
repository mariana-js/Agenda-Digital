import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from '../../models/contato';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
import { ContatoStateService } from '../../services/contato-state.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  imports: [HttpClientModule, NavAniversariantesComponent, NgFor]
})
export class PrincipalComponent {
  readonly url: string

  id_contatoSelecionado: string | null = null;

  contatos: Contato[] = [];
  amount: number = 0;

  constructor(private http: HttpClient, private router: Router, private contatoStateService: ContatoStateService) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getContatos();
  }

  getContatos() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatos = resultados.filter(contato => contato.flag_privado === false);
        this.contatos.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
        this.amount = this.contatos.length;
        if (this.amount === 0) {
          console.log("Erro ao trazer os contatos!")
        }
      });

  }

  informacoes(contato: Contato) {
    contato.id_contatoSelecionado = contato.id_pessoa; // Atribui o id_contatoSelecionado do componente para o contato selecionado
    console.log('Aqui é o id do contato selecionado - Principal: ', contato.id_contatoSelecionado)
    this.contatoStateService.contatoSelecionado = contato; // Armazena o contato selecionado no serviço
    this.router.navigate(['/contato']);

  }

  search(){}



}
