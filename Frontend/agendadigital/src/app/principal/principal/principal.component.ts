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
  itemsPerPage = 5;
  currentPage = 1;
  get totalPages(): number {
    return Math.ceil(this.contatos.length / this.itemsPerPage);
  }

  constructor(private http: HttpClient, private router: Router, private contatoStateService: ContatoStateService) {
    this.url = 'http://localhost:8080';
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
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
  getFuncionarios() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatos = resultados.filter(contatos => contatos.flag_funcionario === true);
        this.amount = this.contatos.length;
        this.contatos.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
        if (this.amount === 0) {
          console.log("Erro ao trazer os funcionários!");
        }
      });
  }
  informacoes(contato: Contato) {
    contato.id_contatoSelecionado = contato.id_pessoa;
    this.contatoStateService.contatoSelecionado = contato;
    this.router.navigate(['/contato', contato.id_contatoSelecionado]);


  }


  search() {
    const searchTerm = (document.querySelector('.search input') as HTMLInputElement).value;
    this.filterContacts(searchTerm);
  }

  filterContacts(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.getContatos();

      return;
    } else {
      this.retorno = "";
    }
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
