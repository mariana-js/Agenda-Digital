import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Contato } from '../../models/contato';
import { ContatoStateService } from '../../services/contato-state.service';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
import { PessoaService } from './../../services/pessoa.service';
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavAniversariantesComponent, NgFor, FormsModule, NgIf, NgStyle],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  contatos: Contato[] = [];
  id_contatoSelecionado: string | null = null;
  searchTerm: string = '';
  retorno: string = "";
  amount: number = 0;
  itemsPerPage = 5;
  currentPage = 1;
  filtroAtual: 'todos' | 'funcionarios' = 'todos';
  private restaurarEstado = true;
  
  constructor(
    private readonly router: Router,
    private readonly contatoStateService: ContatoStateService,
    private readonly pessoaService: PessoaService) {
  } ngOnInit() {
    if (this.restaurarEstado) {
      const savedState = this.contatoStateService.getState();

      if (savedState) {
        this.currentPage = savedState.currentPage || 1;
        this.searchTerm = savedState.searchTerm || '';
        this.filtroAtual = savedState.filtro || 'todos';

        const callback = () => {
          if (this.searchTerm) {
            this.filterContacts(this.searchTerm);
          }
          setTimeout(() => window.scrollTo(0, savedState.scrollY || 0), 0);
        };

        if (this.filtroAtual === 'funcionarios') {
          this.getFuncionarios(callback);
        } else {
          this.getContatos(callback);
        }

        return;
      }
    }

    // carregamento padrão
    this.getContatos();
  } get totalPages(): number {
    return Math.ceil(this.contatos.length / this.itemsPerPage);
  } nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  } getTdHeight(numRows: number): string {
    if (numRows >= 1 && numRows <= 8) {
      const dataRows = numRows - 1;
      const remainingSpace = 25 - (dataRows * 8);
      return `${remainingSpace}rem`;
    } else {
      return 'auto';
    }
  } previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  } getContatos(callback?: () => void) {
    this.pessoaService.getPessoa().subscribe(r => {
      this.contatos = r.filter(r => r.flag_privado === false);
      this.contatos.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
      this.amount = this.contatos.length;
      if (this.amount === 0) {
        console.log("Erro ao trazer os contatos!");
      }

      if (callback) {
        callback();
      }
    });
  } getFuncionarios(callback?: () => void) {
    this.filtroAtual = 'funcionarios';
    this.pessoaService.getPessoa().subscribe(r => {
      this.contatos = r.filter(contatos => contatos.flag_funcionario === true);
      this.contatos.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
      this.amount = this.contatos.length;
      if (this.amount === 0) {
        console.log("Erro ao trazer os contatos!");
      }
      if (callback) {
        callback();
      }
    });
  } informacoes(contato: Contato) {
    // Salvando o estado atual da página e do scrolly:

    this.contatoStateService.saveState({
      currentPage: this.currentPage,
      searchTerm: this.searchTerm,
      scrollY: window.scrollY,
      filtro: this.filtroAtual
    });

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
    const contatosFiltrados = this.contatos.filter(contato =>
      contato.nome_pessoa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (contatosFiltrados) {
      this.contatos = contatosFiltrados;
      this.amount = this.contatos.length;
    } else if (this.amount === 0) {
      this.retorno = "Nenhum contato encontrado.";
      this.getContatos();
    }
  } limparEstados() {
    this.restaurarEstado = false;
    this.currentPage = 1;
    this.searchTerm = '';
    this.filtroAtual = 'todos';
    this.contatoStateService.clearContatoSelecionado();
    this.contatoStateService.saveState(null);
  }
}

