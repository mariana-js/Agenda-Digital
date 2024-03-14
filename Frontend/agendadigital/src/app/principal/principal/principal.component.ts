import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Contato } from '../../models/contato';
import { NavAniversariantesComponent } from "../nav-aniversariantes/nav-aniversariantes.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  imports: [HttpClientModule, NavAniversariantesComponent, NgFor]
})
export class PrincipalComponent {
  readonly url: string;
  contatos: Contato[] = [];


  constructor(private http: HttpClient, private router: Router) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getContatos();
  }

  getContatos() {
    this.http.get<Contato[]>(`${this.url}/pessoa`)
      .subscribe(resultados => {
        this.contatos = resultados;
      });
      this.getHides();
    }

    getHides(){
      for (let i =0 ; i < this.contatos.length; i++){
        const hide = this.contatos.filter(contato => contato.flag_privado === false);
        if (hide.length > 0){
          this.contatos = hide;

        } else {
          console.log("Erro ao trazer os contatos ocultos!")
        }
      }
    }
  informacoes() {
    this.router.navigate(['/contato']);

  }

  // getContatos2() {

  //   this.http.get(`${this.url}/pessoa`)
  //     .subscribe(resultado => console.log(resultado));
  // }
}
