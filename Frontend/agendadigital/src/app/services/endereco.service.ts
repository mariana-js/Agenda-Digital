import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private api = 'https://localhost:8080/endereco';

  endereco: Endereco[] = [];

  constructor(private http: HttpClient) { }

  getEndereco(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.api}`);
  }

  addEndereco(endereco: Endereco): Observable<Endereco> {
    this.endereco.push(endereco);
    return this.http.post<Endereco>(this.api, endereco);
  }

  updateEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.api}/${endereco.id_endereco}`, endereco);
  }

  deleteEndereco(id: string): Observable<void> {
    this.endereco = this.endereco.filter(resp => resp.id_endereco !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
