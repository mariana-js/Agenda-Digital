import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SetorRamal } from '../../models/setor-ramal';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { Setor } from './../../models/setor';
@Component({
  selector: 'app-ramais',
  standalone: true,
  templateUrl: './ramais.component.html',
  styleUrl: './ramais.component.css',
  imports: [HttpClientModule, NavAdminComponent, NgFor]
})
export class RamaisComponent {
  readonly url: string;
  setor_ramais: SetorRamal[] = [];
  setores: Setor[] = [];

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getRamais();
    this.getSetores();
  }

  getRamais() {
    this.http.get<SetorRamal[]>(`${this.url}/setor_ramal`)
      .subscribe(resultados => {
        this.setor_ramais = resultados;

        });
      }

  // getSetor(id_setor: string) {
  //   return this.http.get<Setor[]>(`${this.url}/setor/${id_setor}`);
  // }

  getSetores() {
    this.http.get<Setor[]>(`${this.url}/setor`)
    .subscribe(resultados => {
      this.setores = resultados;
    })
  }
}
