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
      this.router.navigate(['/contatos-admin']);
    // if (this.usuario && this.senha) {
    //   const acc = this.acesso.find(acesso => acesso.usuario === this.usuario && acesso.senha == this.senha);
    //   if (acc !== undefined) {
    //     console.log("Resultado:", acc)
    //     if (acc) {
    //       this.router.navigate(['/contatos-admin']);
    //     } else {
    //       alert('Usuário ou senha inválidos');
    //     }
    //   }
    // } else {
    //   alert('Por favor, insira usuário e senha');
    // }

  }
  rememberPassword() {
      alert('Contacte o administrador para alterar a senha.');
  }
}
//   console.log('Usuario e senha: ',this.usuario,this.senha)
//   if (this.usuario && this.senha) {
//     this.http.post<any>(this.apiUrl, { username: this.usuario, password: this.senha }).subscribe(
//       response => {
//         if (response.token) {
//           this.setToken(response.token);
//           this.router.navigate(['/contatos-admin']);
//         } else {
//           alert('Login falhou: token não recebido.');
//         }
//       },
//       error => {
//         console.error('Login falhou', error);
//         alert('Usuário ou senha inválidos');
//       }
//     );
//   } else {
//     alert('Por favor, insira usuário e senha');
//   }
// }

// setToken(token: string): void {
//   localStorage.setItem('token', token);
// }

// getToken(): string | null {
//   return localStorage.getItem('token');
// }

// isLoggedIn(): boolean {
//   return this.getToken() !== null;
// }

// logout(): void {
//   localStorage.removeItem('token');
// }

// rememberPassword() {
//   alert('Contacte o administrador para alterar a senha.');
