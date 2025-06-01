import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Endereco } from '../../models/endereco';
import { ContatoStateService } from '../../services/contato-state.service';
import { EnderecoService } from '../../services/endereco.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { Contato } from './../../models/contato';
import { Funcionario } from './../../models/funcionario';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-admin-contatos',
  standalone: true,
  imports: [NavAdminComponent, HttpClientModule, NgFor, FormsModule, CommonModule],
  templateUrl: './admin-contatos.component.html',
  styleUrl: './admin-contatos.component.css'
})

export class AdminContatosComponent {

  id_contatoSelecionado: string | null = null;
  contatosHide: Contato[] = [];
  endereco: Endereco[] = [];
  funcionario: Funcionario[] = [];
  amount: number = 0;
  searchTerm: string = '';
  retorno: string = "";
  itemsPerPage = 15;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.contatosHide.length / this.itemsPerPage);
  }
  constructor(
    private readonly router: Router,
    private readonly contatoStateService: ContatoStateService,
    private readonly enderecoService: EnderecoService,
    private readonly funcionarioService: FuncionarioService,
    private readonly contatoService: PessoaService) {
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

  capitalize(text: string): string {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }

  ngOnInit() {
    forkJoin({
      endereco: this.enderecoService.getEndereco(),
      funcionario: this.funcionarioService.getFuncionario()
    }).subscribe(({ endereco, funcionario }) => {
      this.endereco = endereco;
      this.funcionario = funcionario;
      this.getContatos();
    });
  }
  navegarParaAddContato() {
    this.router.navigate(['/cadastrar-contato']);
  }
  getContatos() {
    this.contatoService.getPessoa()
      .subscribe((resultados: Contato[]) => {
        this.contatosHide = resultados;
        this.amount = this.contatosHide.length;
        this.contatosHide.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
        if (this.amount === 0) {
          console.log("Erro ao trazer os contatos!");
        }
      });
  }
  getContatosFuncionarios() {
    this.contatoService.getPessoa()
      .subscribe((resultados: any[]) => {
        this.contatosHide = resultados.filter((contatosHide: { flag_funcionario: boolean; }) => contatosHide.flag_funcionario === true);
        this.amount = this.contatosHide.length;
        this.contatosHide.sort((a, b) => a.nome_pessoa.localeCompare(b.nome_pessoa));
        if (this.amount === 0) {
          console.log("Erro ao trazer os funcionários!");
        }
      });
  }
  getContatosHides() {
    this.contatoService.getPessoa()
      .subscribe((resultados: any[]) => {
        this.contatosHide = resultados.filter((contatosHide: { flag_privado: boolean; }) => contatosHide.flag_privado === true);
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
    this.contatoService.getPessoa()
      .subscribe((resultados: any[]) => {
        this.contatosHide = resultados.filter((contato: { nome_pessoa: string; }) =>
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
    const endereco = this.endereco.find(endereco => endereco.id_pessoa === contato.id_pessoa)?.id_endereco ?? '0';
    const funcionario = this.funcionario.find(funcionario => funcionario.id_pessoa === contato.id_pessoa)?.id_funcionario ?? '0';

    if (confirm('Tem certeza de que deseja excluir este contato?')) {
      if (endereco !== '0') {
        this.excluirEndereco(endereco);
      }
      if (funcionario !== '0') {
        this.excluirFuncionario(funcionario, contato);
      } else {
        this.excluirContato(contato);
      }
    } else {
      return;
    }
  }

  excluirEndereco(id_endereco: string) {
    this.enderecoService.deleteEndereco(id_endereco)
      .subscribe(
        () => {
          this.endereco = this.endereco.filter(s => s.id_endereco !== id_endereco);
        },
        (error: any) => {
          console.error('Erro ao excluir contato:', error);
        }
      );
  }

  excluirFuncionario(id_funcionario: string, contato: Contato) {
    this.funcionarioService.deleteFuncionario(id_funcionario)
      .subscribe(
        () => {
          this.funcionario = this.funcionario.filter(s => s.id_funcionario !== id_funcionario);
          this.excluirContato(contato);
        },
        (error: any) => {
          console.error('Erro ao excluir funcionario:', error);
        }
      );
  }

  excluirContato(contato: Contato) {
    this.contatoService.deletePessoa(contato.id_pessoa)
      .subscribe(
        () => {
          this.contatosHide = this.contatosHide.filter(s => s.id_pessoa !== contato.id_pessoa);
          this.getContatos();
          alert('Contato excluído com sucesso!');
        },
        (error: any) => {
          this.getContatos();
          console.error('Erro ao excluir contato:', error);
          alert('Erro ao excluir contato!');
        }
      );
  }
  alterarContato(contato: Contato) {
    contato.id_contatoSelecionado = contato.id_pessoa;
    this.contatoStateService.contatoSelecionado = contato;
    this.router.navigate(['/contato-admin', contato.id_contatoSelecionado]);
  }

}
