import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Contato } from '../../models/contato';
import { ContatoStateService } from '../../services/contato-state.service';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  imports: [HttpClientModule, NavAniversariantesComponent, NgFor, FormsModule]
})
export class PrincipalComponent implements OnDestroy {
  readonly url: string
  searchTerm: string = '';
  retorno: string = "";
  id_contatoSelecionado: string | null = null;
  contatos: Contato[] = [];
  amount: number = 0;
  itemsPerPage = 2;
  currentPage = 1;

  private routerSubscription: Subscription;

  get totalPages(): number {
    return Math.ceil(this.contatos.length / this.itemsPerPage);
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private contatoStateService: ContatoStateService) {
    this.url = 'http://localhost:8080';
    // Assinar eventos de navegação para detectar quando a página principal é deixada
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter(() => this.router.url === '/') // Verificar se a rota é a página principal
      )
      .subscribe(() => {
        // Armazenar o estado atual ao sair da página principal
        this.contatoStateService.saveState({
          currentPage: this.currentPage,
          searchTerm: this.searchTerm
        });
      });
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

    }
    this.contatoStateService.getState().currentPage = this.currentPage ;
    console.log(this.contatoStateService.getState().currentPage, this.contatoStateService.getState().searchTerm)

  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  ngOnInit() {
    // console.log(this.currentPage, this.searchTerm)
    // console.log(this.contatoStateService.getState())
    // Restaurar o estado ao retornar à página principal
    const savedState = this.contatoStateService.getState();
    if (savedState) {
      this.currentPage = savedState.currentPage;
      this.searchTerm = savedState.searchTerm;
    }
    // Iniciar a recuperação de contatos
    this.getContatos();
  }
  ngOnDestroy(): void {
    this.contatoStateService.getState().currentPage = this.currentPage ;
    this.routerSubscription.unsubscribe();
  }
  getContatos() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatos = resultados.filter(contato => contato.flag_privado === false);
        this.contatos.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
        this.amount = this.contatos.length;
      })
  }

  getFuncionarios() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatos = resultados.filter(contatos => contatos.flag_funcionario === true);
        this.amount = this.contatos.length;
        this.contatos.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
        // Recalcula o número total de páginas
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
          // this.retorno = "Nenhum contato encontrado.";
          this.getContatos();
        }
      });
  }
}
