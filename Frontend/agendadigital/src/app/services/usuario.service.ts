import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
private readonly api = 'http://localhost:8080/usuario';
  usuario: Usuario[] = [];
  constructor(private http: HttpClient) { }

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.api}`);
  }

  addUsuario(usuario: Usuario): Observable<Usuario>{
    this.usuario.push(usuario);
    return this.http.post<Usuario>(this.api, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.api}/${usuario.id_usuario}`,usuario);
  }

  deleteUsuario(id:string): Observable<void>{
    this.usuario = this.usuario.filter(resp => resp.id_usuario !== id);
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
