import { Injectable } from '@angular/core';
import { Setor } from '../models/setor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

private readonly api = 'http://localhost:8080/setor';
  setor: Setor[] = [];
  constructor(private http: HttpClient) { }

  getSetor(): Observable<Setor[]> {
    return this.http.get<Setor[]>(`${this.api}`);
  }

  addSetor(setor: Setor): Observable<Setor>{
    this.setor.push(setor);
    return this.http.post<Setor>(this.api, setor);
  }

  updateSetor(setor: Setor): Observable<Setor>{
    return this.http.put<Setor>(`${this.api}/${setor.id_setor}`,setor);
  }
  
  deleteSetor(id:string): Observable<void>{
    this.setor = this.setor.filter(resp => resp.id_setor !== id);
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
