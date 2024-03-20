import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from '../../models/contato';
import { ContatoStateService } from '../../services/contato-state.service';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  imports: [HttpClientModule, NavAniversariantesComponent, NgFor, FormsModule]
})
export class PrincipalComponent {
  readonly url: string

  searchTerm: string = '';
  retorno: string = "";

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
    contato.id_contatoSelecionado = contato.id_pessoa;
    this.contatoStateService.contatoSelecionado = contato;
    this.router.navigate(['/contato']);

  }


  search() {
    console.log('Search')
    // Captura o valor do input usando o ElementRef
    const searchTerm = (document.querySelector('.search input') as HTMLInputElement).value;

    // Chama a função de busca passando o termo de pesquisa
    this.filterContacts(searchTerm);
  }

  filterContacts(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.getContatos();
      return;
    }
    console.log('Search 2', searchTerm)
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatos = resultados.filter(contato =>
          contato.flag_privado === false &&
          contato.nome_pessoa.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.amount = this.contatos.length;
        if (this.amount === 0) {
          this.retorno = "Nenhum contato encontrado.";
          this.getContatos();
        }
      });
  }


}
