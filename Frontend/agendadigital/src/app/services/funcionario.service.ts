import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private api = 'http://localhost:8080/funcionario';
  funcionario: Funcionario[] = [];

  constructor(private readonly http: HttpClient) { }

  getFuncionario(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.api}/all`);
  }
  getAniversariantes(): Observable<Funcionario[]> {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    return this.http.get<Funcionario[]>(`${this.api}?mes=${mesAtual}`);
  }

  addFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    this.funcionario.push(funcionario);
    return this.http.post<Funcionario>(this.api, funcionario);
  }

  updateFuncionario(funcionario: Funcionario): Observable <Funcionario>{
    return this.http.put<Funcionario>(`${this.api}/${funcionario.id_funcionario}`,funcionario);
  }

  deleteFuncionario(id: string):Observable<void>{
    this.funcionario = this.funcionario.filter(resp => resp.id_funcionario !== id);
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
