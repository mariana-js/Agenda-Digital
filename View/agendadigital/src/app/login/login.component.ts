import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, HttpClientModule]
})
export class LoginComponent {
  usuario: string | undefined;
  senha: string | undefined;
  acesso: Usuario[] = [];
  readonly url: string;
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { this.url = 'http://localhost:8080'; }

  ngOnInit() {
    forkJoin({
      acesso: this.http.get<Usuario[]>(`${this.url}/usuario`),
    }).subscribe(({ acesso }) => {
      this.acesso = acesso;
    });
  }

  login() {
    if (this.usuario && this.senha) {
      const acc = this.acesso.find(acesso => acesso.usuario === this.usuario && acesso.senha == this.senha);
      if (acc !== undefined) {
        console.log("Resultado:", acc)
        if (acc) {
          this.router.navigate(['/contatos-admin']);
        } else {
          alert('Usuário ou senha inválidos');
        }
      }
    } else {
      alert('Por favor, insira usuário e senha');
    }

  }
  rememberPassword() {
      alert('Contacte o administrador para alterar a senha.');
  }
}