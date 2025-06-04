import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly api = 'http://localhost:8080/pessoa';
  contato: Contato[] = [];
  constructor(private http: HttpClient) { }

  getPessoa(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.api}`);
  }

  addPessoa(contato: Contato): Observable<Contato>{
    this.contato.push(contato);
    return this.http.post<Contato>(this.api, contato);
  }

  updatePessoa(contato: Contato): Observable<Contato>{
    return this.http.put<Contato>(`${this.api}/${contato.id_pessoa}`,contato);
  }

  deletePessoa(id:string): Observable<void>{
    this.contato = this.contato.filter(resp => resp.id_pessoa !== id);
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
