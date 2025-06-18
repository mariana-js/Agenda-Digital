import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-alterarsenha',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink],
  templateUrl: './alterarsenha.component.html',
  styleUrl: './alterarsenha.component.css'
})
export class AlterarsenhaComponent {
  usuario: string | undefined;
  senhaAtual: string | undefined;
  senha1: string = '';
  senha2: string = '';
  acesso: Usuario[] = [];
  mensagens: String[] = [];

  newUser: Usuario = {
    id_usuario: '',
    nome: '',
    usuario: '',
    senha: ''
  }
  constructor(
    private readonly router: Router,
    private readonly usuarioService: UsuarioService
  ) {

  } ngOnInit() {
    forkJoin({
      acesso: this.usuarioService.getUsuario(),
    }).subscribe(({ acesso }) => {
      this.acesso = acesso;
    });
  } alterar() {

    this.verificarUsuario();
    if (this.mensagens.length === 0) {

      const user = this.acesso.find(user => user.usuario === this.usuario);

      if (user) {
        this.newUser = user;
        this.newUser.senha = this.senha1

        this.usuarioService.verificarSenha(this.usuario!, this.senhaAtual!)
          .subscribe({
            next: () => {
              this.usuarioService.updateUsuario(this.newUser)
                .subscribe(
                  (r) => {
                    console.log(r)
                    this.router.navigate(['/login']);
                    alert('Senha alterada com sucesso!');
                  },
                  error => {
                    console.error('Erro ao atualizar a senha do usuário:', error);
                    alert('Erro ao alterar senha do usuário!');
                  }
                )
            },
            error: err => {
              if (err.status === 401) {
                this.mensagens.push('Senha atual incorreta');
              } else {
                this.mensagens.push('Erro ao verificar senha');
              }
              alert(this.mensagens)
            }
          });


      }



    } else alert(this.mensagens)

  }
  verificarUsuario() {
    this.mensagens = [];

    if ((this.usuario === '' || this.senhaAtual === '' || this.senha1 === '' || this.senha2 === '')) return this.mensagens.push('Campo(s) vazio(s).')
    const user = this.acesso.find(user => user.usuario === this.usuario);
    if (!user) return this.mensagens.push('Usuário não não encontrado!')

    if (this.senhaAtual === (this.senha1 && this.senha2)) return this.mensagens.push('Insira uma senha diferente da anterior.')

    if (this.senha1 !== this.senha2) return this.mensagens.push('As senhas precisam ser iguais.')

    if (this.senha1.length < 6) return this.mensagens.push('A senha precisa ter 6 caracteres ou mais.')

    return this.mensagens;



  }

}
