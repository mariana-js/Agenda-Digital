import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  usuario: string | undefined;
  senha: string | undefined;
  acesso: Usuario[] = [];

  constructor(
    private readonly router: Router,
    private readonly usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    forkJoin({
      acesso: this.usuarioService.getUsuario(),
    }).subscribe(({ acesso }) => {
      this.acesso = acesso;
    });
  }

  login() {

    if (this.usuario !== '' && this.senha !== '') {
      this.usuarioService.verificarSenha(this.usuario!, this.senha!)
        .subscribe({
          next: () => {
            this.router.navigate(['/contatos-admin']);
          },
          error: err => {
            if (err.status === 401) {
              alert('Senha atual incorreta!');
            } else {
              alert('Verifique se usuário e senha estão corretos.');
            }
          }
        });
    }

  }
  alterarSenha() {
    this.router.navigate(['/alterar-senha'])
  }
}
