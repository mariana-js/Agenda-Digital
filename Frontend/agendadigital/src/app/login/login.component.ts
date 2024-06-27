import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string | undefined;
  senha: string | undefined;
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login() {
    console.log('Usuario e senha: ',this.usuario,this.senha)
    if (this.usuario && this.senha) {
      this.http.post<any>(this.apiUrl, { username: this.usuario, password: this.senha }).subscribe(
        response => {
          if (response.token) {
            this.setToken(response.token);
            this.router.navigate(['/contatos-admin']);
          } else {
            alert('Login falhou: token não recebido.');
          }
        },
        error => {
          console.error('Login falhou', error);
          alert('Usuário ou senha inválidos');
        }
      );
    } else {
      alert('Por favor, insira usuário e senha');
    }
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  rememberPassword() {
    alert('Contacte o administrador para alterar a senha.');
  }
}
