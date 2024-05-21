import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string | undefined;
  senha: string | undefined;
  login: Usuario[] = [];
  readonly url: string;
  constructor(
    private router: Router,
    private http: HttpClient) {
    this.url = 'http://localhost:8080';

  }

  ngOnInit() {
    forkJoin({
      login: this.http.get<Usuario[]>(`${this.url}/usuario`),
    }).subscribe(({ login }) => {
      this.login = login;
    });

  }
  logar() {
    const usuarioExiste = this.login.find(user => user.usuario === this.usuario)
    const logar = this.login.find(user => user.usuario === this.usuario )


    this.router.navigate(['/contatos-admin']);
  }
}
