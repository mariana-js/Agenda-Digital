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
  novoUsuario: Usuario = { id_usuario: '' , nome: this.nome, usuario: this.usuario, senha: this.senha }; // Novo setor a ser inserido

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

  adicionarUsuario(){
    this.novoUsuario.nome = this.nome;
    this.novoUsuario.usuario = this.usuario;
    this.novoUsuario.senha = this.senha;

    this.http.post<Usuario>(`${this.url}/usuario`, this.novoUsuario)
    .subscribe(novoUsuario => {
      this.users.push(novoUsuario);
      this.users.sort((a,b) => a.nome.localeCompare(b.nome));
      this.nome = '';
      this.usuario ='';
      this.senha = '';
    }, error => {
      console.error('Erro ao adicionar usuario:', error);
    })
  }

}
