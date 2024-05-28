import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Contato } from '../../models/contato';
import { ContatoStateService } from '../../services/contato-state.service';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  imports: [HttpClientModule, NavAniversariantesComponent, NgFor, FormsModule, NgIf, NgStyle,NgClass]
})
export class PrincipalComponent {
  readonly url: string

  contatos: Contato[] = [];
  id_contatoSelecionado: string | null = null;
  searchTerm: string = '';
  retorno: string = "";
  amount: number = 0;
  itemsPerPage = 15;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.contatos.length / this.itemsPerPage);
  }
   constructor(
    private http: HttpClient,
    private router: Router,
    private contatoStateService: ContatoStateService) {
    this.url = 'http://localhost:8080';
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  getTdHeight(numRows: number): string {
    if (numRows >= 1 && numRows <= 8) {
      const dataRows = numRows - 1;
      const remainingSpace = 25 - (dataRows * 8);
      return `${remainingSpace}rem`;
    } else {
      return 'auto';
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
          console.log("Erro ao trazer os contatos!");
        }
      })
  }
  getFuncionarios() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatos = resultados.filter(contatos => contatos.flag_funcionario === true);
        this.amount = this.contatos.length;
        this.contatos.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
      });
  } informacoes(contato: Contato) {
    contato.id_contatoSelecionado = contato.id_pessoa;
    this.contatoStateService.contatoSelecionado = contato;
    this.router.navigate(['/contato', contato.id_contatoSelecionado]);
  } search() {
    const searchTerm = (document.querySelector('.search input') as HTMLInputElement).value;
    this.filterContacts(searchTerm);
  } filterContacts(searchTerm: string) {
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
