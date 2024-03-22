import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Setor } from '../../models/setor';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
@Component({
  selector: 'app-setores',
  standalone: true,
  templateUrl: './setores.component.html',
  styleUrl: './setores.component.css',
  imports: [NavAdminComponent, NgFor, HttpClientModule, FormsModule]
})
export class SetoresComponent {
  readonly url: string;
  id: string = '';
  setor: string = '';
  sigla: string = '';

  setores: Setor[] = [];
  setorSelecionado: Setor | null = null;
  novoSetor: Setor = { id_setor: '', nome_setor: this.setor, sigla_setor: this.sigla };

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getSetores();

  }

  getSetores() {
    this.http.get<Setor[]>(`${this.url}/setor`)
      .subscribe(resultados => {
        this.setores = resultados;
        this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));

      });
  }

  clear() {
    this.setor = '';
    this.sigla = '';
  }

  adicionarSetor() {
    if (this.setorSelecionado) {
      // Se setorSelecionado não for nulo, então estamos atualizando um setor existente
      this.atualizarSetor();
    } else {
      // Caso contrário, estamos adicionando um novo setor
      this.adicionarNovoSetor();
    }
  }

  adicionarNovoSetor() {
    
    this.novoSetor.nome_setor = this.setor;
    this.novoSetor.sigla_setor = this.sigla;
    // Verificar se o setor já existe localmente
    const setorExistente = this.setores.find(setor =>
      setor.nome_setor.trim().toLowerCase() === this.novoSetor.nome_setor.trim().toLowerCase() ||
      setor.sigla_setor.trim().toLowerCase() === this.novoSetor.sigla_setor.trim().toLowerCase()
    );
  
    if (setorExistente) {
      // Se setorExistente não for undefined, um setor correspondente foi encontrado na lista
      alert('O setor já está cadastrado.');
      return; // Parar a execução da função se o setor já existir localmente
    }
  
    // Se o setor não existe localmente, enviar a solicitação para adicionar
    this.http.post<Setor>(`${this.url}/setor`, this.novoSetor)
      .subscribe(
        novoSetor => {
          this.setores.push(novoSetor);
          this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));
          this.clear();
          this.getSetores();
        },
        error => {
          // Lidar com erros de HTTP, se necessário
          console.error('Erro ao adicionar setor:', error);
        }
      );
  }
  


  selecionarSetor(setor: Setor) {
    this.setorSelecionado = { ...setor };
    this.setor = setor.nome_setor; // Preencher o campo "setor" com o nome do setor selecionado
    this.sigla = setor.sigla_setor;
  }

  atualizarSetor() {
    if (!this.setorSelecionado) return;
    this.setorSelecionado.sigla_setor = this.sigla;
    this.setorSelecionado.nome_setor = this.setor;
    // Verificar se o nome do setor já existe localmente, excluindo o setor selecionado
    const nomeExistente = this.setores.some(setor =>
      setor.nome_setor.trim().toLowerCase() === this.setor.trim().toLowerCase() &&
      setor.id_setor !== this.setorSelecionado?.id_setor
    );
  
    if (nomeExistente) {
      alert('O nome do setor já está cadastrado.');
      return;
    }
  
    // Verificar se a sigla do setor já existe localmente, excluindo o setor selecionado
    const siglaExistente = this.setores.some(setor =>
      setor.sigla_setor.trim().toLowerCase() === this.sigla.trim().toLowerCase() &&
      setor.id_setor !== this.setorSelecionado?.id_setor
    );
  
    if (siglaExistente) {
      alert('A sigla do setor já está cadastrada.');
      return;
    }
  
    // Atualizar o setor apenas se nenhum nome ou sigla existir
    this.setorSelecionado.sigla_setor = this.sigla;
    this.setorSelecionado.nome_setor = this.setor;
  
    this.http.put<Setor>(`${this.url}/setor/${this.setorSelecionado.id_setor}`, this.setorSelecionado)
      .subscribe(
        () => {
          alert('Setor atualizado com sucesso!');
          this.clear();
          this.setorSelecionado = null;
          this.getSetores(); // Atualiza a lista de setores após a atualização
        },
        error => {
          console.error('Erro ao atualizar setor:', error);
          alert('Erro ao atualizar setor!');
        }
      );
  }
  
  

}
// atualizarSetor() {
//   if (!this.setorSelecionado) return;

//   this.setorSelecionado.sigla_setor = this.sigla;
//   this.setorSelecionado.nome_setor = this.setor;
  
//   console.log('Setor selecioando: ', this.setorSelecionado)
//   this.http.put<Setor>(`${this.url}/setor/${this.setorSelecionado.id_setor}`, this.setorSelecionado)
//     .subscribe(
//       () => {
//         alert('Setor atualizado com sucesso!');
//         this.clear();
//         this.setorSelecionado = null;
//         this.getSetores(); // Atualiza a lista de setores após a atualização
//       },
//       error => {
//         console.error('Erro ao atualizar setor:', error);
//         alert('Erro ao atualizar setor. Verifique o console para mais detalhes.');
//       }
//     );
// }