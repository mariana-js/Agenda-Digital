import { Injectable } from '@angular/core';
import { SetorRamal } from '../models/setor-ramal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetorRamalService {
private readonly api = 'http://localhost:8080/setor_ramal';
  setorRamal: SetorRamal[] = [];
  constructor(private http: HttpClient) { }

  getSetorRamal(): Observable<SetorRamal[]> {
    return this.http.get<SetorRamal[]>(`${this.api}`);
  }

  addSetorRamal(setorRamal: SetorRamal): Observable<SetorRamal>{
    this.setorRamal.push(setorRamal);
    return this.http.post<SetorRamal>(this.api, setorRamal);
  }

  updateSetorRamal(setorRamal: SetorRamal): Observable<SetorRamal>{
    return this.http.put<SetorRamal>(`${this.api},${setorRamal.id_setor_ramal}`,setorRamal);
  }

  deleteSetorRamal(id:string): Observable<void>{
    this.setorRamal = this.setorRamal.filter(resp => resp.id_setor_ramal !== id);
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
