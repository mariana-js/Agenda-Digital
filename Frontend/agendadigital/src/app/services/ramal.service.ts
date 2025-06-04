import { Injectable } from '@angular/core';
import { Ramal } from '../models/ramal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RamalService {
private readonly api = 'http://localhost:8080/ramal';
  ramal: Ramal[] = [];
  constructor(private http: HttpClient) { }

  getRamal(): Observable<Ramal[]> {
    return this.http.get<Ramal[]>(`${this.api}`);
  }

  addRamal(ramal: Ramal): Observable<Ramal>{
    this.ramal.push(ramal);
    return this.http.post<Ramal>(this.api, ramal);
  }

  updateRamal(ramal: Ramal): Observable<Ramal>{
    return this.http.put<Ramal>(`${this.api}/${ramal.numero_ramal}`,ramal);
  }

  deleteRamal(id:string): Observable<void>{
    this.ramal = this.ramal.filter(resp => resp.numero_ramal !== id);
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
