import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  readonly url : string;


  constructor(private http : HttpClient) {
    this.url = 'http://localhost:8080';
  }


  getContatos() {

    this.http.get(`${ this.url }/pessoa`)
           .subscribe(resultado => console.log(resultado));
  }
}

