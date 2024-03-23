import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  imports: [NavAdminComponent, HttpClientModule, NgFor, FormsModule]
})
export class UsuariosComponent {

  readonly url: string;
  users: Usuario[] = [];

  nome: string = '';
  usuario: string = '';
  senha: string = '';
  userSelecionado: Usuario | null = null;
  novoUsuario: Usuario = { id_usuario: '', nome: this.nome, usuario: this.usuario, senha: this.senha }; // Novo setor a ser inserido

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.http.get<Usuario[]>(`${this.url}/usuario`)
      .subscribe(resultados => {
        this.users = resultados;
        this.users.sort((a, b) => a.nome.localeCompare(b.nome));
        this.clear();
      });
  }
  clear() {
    this.nome = '';
    this.usuario = '';
    this.senha = '';
  }

  adicionarUsuario() {
    if (this.userSelecionado) {
      // Se setorSelecionado não for nulo, então estamos atualizando um setor existente
      this.atualizarUsuario();
    } else {
      // Caso contrário, estamos adicionando um novo setor
      this.adicionarNovoUsuario();
    }
  }
  adicionarNovoUsuario() {
    this.novoUsuario.nome = this.nome;
    this.novoUsuario.usuario = this.usuario;
    this.novoUsuario.senha = this.senha;

    // Verificar se o nome do usuário já existe localmente
    const nomeExistente = this.users.find(usuario =>
      usuario.nome.trim().toLowerCase() === this.novoUsuario.nome.trim().toLowerCase()
    );

    if (nomeExistente) {
      alert('O nome de usuário já está sendo utilizado.');
      return; // Parar a execução da função se o nome já existir localmente
    }

    // Verificar se o nome de usuário já existe localmente
    const usuarioExistente = this.users.find(usuario =>
      usuario.usuario.trim().toLowerCase() === this.novoUsuario.usuario.trim().toLowerCase()
    );

    if (usuarioExistente) {
      alert('O nome de usuário já está cadastrado.');
      return; // Parar a execução da função se o usuário já existir localmente
    }
    this.http.post<Usuario>(`${this.url}/usuario`, this.novoUsuario)
      .subscribe(novoUsuario => {
        this.users.push(novoUsuario);
        this.users.sort((a, b) => a.nome.localeCompare(b.nome));
        this.clear();

      }, error => {
        console.error('Erro ao adicionar usuario:', error);
      })
  }


  selecionarUsuario(user: Usuario) {
    this.userSelecionado = { ...user }
    this.nome = user.nome;
    this.usuario = user.usuario;
    this.senha = user.senha;
  }

  atualizarUsuario() {
    if (!this.userSelecionado) return;
    this.userSelecionado.nome = this.nome;
    this.userSelecionado.usuario = this.usuario;

    // Verificar se o nome do setor já existe localmente, excluindo o setor selecionado
    const nomeExistente = this.users.some(user =>
      user.nome.trim().toLowerCase() === this.nome.trim().toLowerCase() &&
      user.id_usuario !== this.userSelecionado?.id_usuario
    );

    if (nomeExistente) {
      alert('Este nome já está cadastrado!');
      return;
    }

    // Verificar se a sigla do setor já existe localmente, excluindo o setor selecionado
    const usuarioExistente = this.users.some(user =>
      user.usuario.trim().toLowerCase() === this.usuario.trim().toLowerCase() &&
      user.id_usuario !== this.userSelecionado?.id_usuario
    );

    if (usuarioExistente) {
      alert('O nome de usuário já está cadastrado!');
      return;
    }

    // Atualizar o setor apenas se nenhum nome ou sigla existir
    this.userSelecionado.nome = this.nome;
    this.userSelecionado.usuario = this.usuario;
    this.userSelecionado.senha = this.senha;

    this.http.put<Usuario>(`${this.url}/usuario/${this.userSelecionado.id_usuario}`, this.userSelecionado)
      .subscribe(
        () => {
          alert('Setor atualizado com sucesso!');
          this.clear();
          this.userSelecionado = null;
          this.getUsuarios(); // Atualiza a lista de setores após a atualização
        },
        error => {
          console.error('Erro ao atualizar usuário:', error);
          alert('Erro ao atualizar usuário!');
        }
      );
  }

  excluirUsuario(user: Usuario) {
    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
      this.http.delete(`${this.url}/usuario/${user.id_usuario}`)
        .subscribe(
          () => {
            this.users = this.users.filter(s => s.id_usuario !== user.id_usuario);
            this.getUsuarios();
            alert('Usuário excluído com sucesso!');
          },
          error => {
            
            this.getUsuarios();
            console.error('Erro ao excluir setor:', error);
            alert('Erro ao excluir setor!');
          }
        );
    }
  }
}
