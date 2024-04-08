import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { Contato } from './../../models/contato';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoStateService } from '../../services/contato-state.service';

@Component({
  selector: 'app-contatos-hide',
  standalone: true,
  templateUrl: './contatos-hide.component.html',
  styleUrl: './contatos-hide.component.css',
  imports: [NavAdminComponent, HttpClientModule, NgFor, FormsModule]
})
export class ContatosHideComponent {
  readonly url: string;
  id_contatoSelecionado: string | null = null;
  contatosHide: Contato[] = [];
  amount: number = 0;
  searchTerm: string = '';
  retorno: string = "";
  itemsPerPage = 5;
  currentPage = 1;


  get totalPages(): number {
    return Math.ceil(this.contatosHide.length / this.itemsPerPage);
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
  navegarParaAddContato() {
    this.router.navigate(['/cadastrar-contato']);
  }
  getContatos() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatosHide = resultados;
        this.amount = this.contatosHide.length;
        this.contatosHide.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
        if (this.amount === 0) {
          console.log("Erro ao trazer os contatos!");
        }
      });
  }
  getContatosHides() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatosHide = resultados.filter(contatosHide => contatosHide.flag_privado === true);
        this.amount = this.contatosHide.length;
        this.contatosHide.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
        if (this.amount === 0) {
          console.log("Erro ao trazer os contatos ocultos!");
        }
      });
  }
  informacoes(contatosHide: Contato) {
    contatosHide.id_contatoSelecionado = contatosHide.id_pessoa;
    this.contatoStateService.contatoSelecionado = contatosHide;
    // this.router.navigate(['/contato']);
    this.router.navigate(['/contato', contatosHide.id_contatoSelecionado]);


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
        this.contatosHide = resultados.filter(contato =>
          contato.nome_pessoa.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.amount = this.contatosHide.length;
        if (this.amount === 0) {
          this.retorno = "Nenhum contato encontrado.";
          this.getContatos();
        }
      });
  }
  excluir(contato: Contato) {
    const id_endereco = '0';
    const id_funcionario = '0';
    this.excluirEndereco(contato, id_endereco);
    this.excluirFuncionario(contato, id_funcionario);
    this.excluirContato(contato);
  }

  excluirEndereco(contato: Contato, id: string) {
    if (confirm('Tem certeza de que deseja excluir este contato?')) {
      if (id !== '0') {
        this.http.delete(`${this.url}/endereco/${id}`)
          .subscribe(
            () => {
              this.contatosHide = this.contatosHide.filter(s => s.id_pessoa !== contato.id_pessoa);
              return 'ok';
            },
            error => {
              console.error('Erro ao excluir contato:', error);
              return 'erro';
            }
          );
      } else if (id === '0') {
        console.log('Não há endereco cadastrado relacionado a esse contato!')
      }
    }

  }
  excluirFuncionario(contato: Contato, id: string) {
    if (id !== '0') {
      this.http.delete(`${this.url}/funcionario/${id}`)
        .subscribe(
          () => {
            this.contatosHide = this.contatosHide.filter(s => s.id_pessoa !== contato.id_pessoa);
          },
          error => {
            console.error('Erro ao excluir funcionario:', error);
          }
        );
    } else if (id === '0') {
      console.log('Não há funcionario cadastrado relacionado a esse contato!')
    }
  }
  excluirContato(contato: Contato) {
    this.http.delete(`${this.url}/pessoa/${contato.id_pessoa}`)
      .subscribe(
        () => {
          this.contatosHide = this.contatosHide.filter(s => s.id_pessoa !== contato.id_pessoa);
          this.getContatos();
          alert('Contato excluído com sucesso!');
        },
        error => {
          this.getContatos();
          console.error('Erro ao excluir contato:', error);
          alert('Erro ao excluir contato!');
        }
      );
  }
  alterarContato() {
  }

}
