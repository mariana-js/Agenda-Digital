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
      });
  }
  clear(){
    this.nome = '';
    this.usuario = '';
    this.senha = '';
  }

  adicionarUsuario() {
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

}
