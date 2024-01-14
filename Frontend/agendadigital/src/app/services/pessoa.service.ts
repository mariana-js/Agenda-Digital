import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  SERVER = 'http:localhost:8080';
  constructor(private http: HttpClient) { }

  public getPessoas(){
    return this.http.get(`${this.SERVER}/pessoa`);
  }

}
