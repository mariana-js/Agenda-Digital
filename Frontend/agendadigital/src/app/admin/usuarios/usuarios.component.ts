import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { ValidationSRUService } from '../../services/validation-sru.service';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  imports: [NavAdminComponent, NgFor, FormsModule, NgIf, NgStyle]
})
export class UsuariosComponent {

  users: Usuario[] = [];

  nome: string = '';
  usuario: string = '';
  senha: string = '';
  mensagem: string = '';
  validacao: string[] = [];
  userSelecionado: Usuario | null = null;
  novoUsuario: Usuario = { id_usuario: '', nome: this.nome, usuario: this.usuario, senha: this.senha };

  constructor(private readonly usuarioService: UsuarioService,
    private readonly validationService: ValidationSRUService
  ) {
  } ngOnInit() {
    this.getUsuarios();
  } getTdHeight(numRows: number): string {
    if (numRows >= 1 && numRows <= 4) {
      const dataRows = numRows - 1;
      const remainingSpace = 18 - (dataRows * 4);
      return `${remainingSpace}rem`;
    } else {
      return 'auto';
    }
  } getUsuarios() {
    this.usuarioService.getUsuario()
      .subscribe(resultados => {
        this.users = resultados;
        this.users.sort((a, b) => a.nome.localeCompare(b.nome));
        this.clear();
      });
  } clear() {
    this.nome = '';
    this.usuario = '';
    this.senha = '';
    this.userSelecionado = null;
  } async salvar() {

    const modo = this.userSelecionado ? 'atualizar' : 'adicionar';
    const idAtual = this.userSelecionado?.id_usuario;

    const v = await this.validationService.authUsuario(this.nome, this.usuario, this.senha, modo, idAtual)

    this.validacao = v;
    if ((v).length === 0) {


      if (this.userSelecionado) this.atualizarUsuario();
      else this.adicionarNovoUsuario();

    } else {
      alert(this.validacao.join('\n'))
    }

  } adicionarNovoUsuario() {
    this.novoUsuario.nome = this.nome;
    this.novoUsuario.usuario = this.usuario;
    this.novoUsuario.senha = this.senha;

    // Verificar se o nome do usuário já existe localmente
    const nomeExistente = this.users.find(usuario =>
      usuario.nome.trim()?.toLowerCase() === this.novoUsuario.nome.trim().toLowerCase()
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
    this.usuarioService.addUsuario(this.novoUsuario)
      .subscribe(novoUsuario => {
        this.users.push(novoUsuario);
        alert('Usuário adicionado com sucesso!')
        this.users.sort((a, b) => a.nome.localeCompare(b.nome));
        this.clear();

      }, error => {
        alert('Erro ao adicionar usuário!')
        console.error('Erro ao adicionar usuario:', error);
      })
  } selecionarUsuario(user: Usuario) {
    this.userSelecionado = { ...user }
    this.nome = user.nome;
    this.usuario = user.usuario;
    this.senha = user.senha;
  } atualizarUsuario() {
    if (!this.userSelecionado) return;
    this.userSelecionado.nome = this.nome;
    console.log(this.nome, this.userSelecionado.nome)
    this.userSelecionado.usuario = this.usuario;

    // Verificar se o nome do setor já existe localmente, excluindo o setor selecionado
    const nomeExistente = this.users.some(user =>
      (user.nome?.trim().toLowerCase() || '') === (this.nome?.trim().toLowerCase() || '') &&
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
    console.log(this.nome, this.userSelecionado.nome)

    this.usuarioService.updateUsuario(this.userSelecionado)
      .subscribe(
        () => {
          alert('Usuário atualizado com sucesso!');
          this.clear();
          this.userSelecionado = null;
          this.getUsuarios(); // Atualiza a lista de setores após a atualização
        },
        error => {
          console.error('Erro ao atualizar usuário:', error);
          alert('Erro ao atualizar usuário!');
        }
      );
  } excluirUsuario(user: Usuario) {
    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
      this.usuarioService.deleteUsuario(user.id_usuario)
        .subscribe(
          () => {
            this.users = this.users.filter(s => s.id_usuario !== user.id_usuario);
            this.getUsuarios();
            alert('Usuário excluído com sucesso!');
          },
          error => {

            this.getUsuarios();
            console.error('Erro ao excluir usuario:', error);
            alert('Erro ao excluir usuario!');
          }
        );
    }
  }
}
