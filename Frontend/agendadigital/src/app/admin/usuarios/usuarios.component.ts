import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  imports: [NavAdminComponent, HttpClientModule, NgFor]
})
export class UsuariosComponent {
  readonly url: string;
  users: Usuario[] = [];

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

}