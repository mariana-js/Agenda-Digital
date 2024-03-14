import { Contato } from './../../models/contato';
import { Component } from '@angular/core';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-contatos-hide',
  standalone: true,
  templateUrl: './contatos-hide.component.html',
  styleUrl: './contatos-hide.component.css',
  imports: [NavAdminComponent, HttpClientModule, NgFor]
})
export class ContatosHideComponent {
  readonly url: string;
  contatosHide: Contato[] = [];

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  ngOnInit() {

      console.log("I'm Here!")
      this.getContatosHides()

  }

  getContatosHides() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatosHide = resultados;


      });
  }

  // getHides(){
  //   for (let i =0 ; i < this.contatosHide.length; i++){
  //     const flag_privado = this.contatosHide[i];
  //     const contato = this.contatosHide.find(contato => contato.flag_privado === true);
  //     if (contato){

  //     } else {
  //       console.log("Erro ao trazer os contatos ocultos!")
  //     }
  //   }
  // }

}
