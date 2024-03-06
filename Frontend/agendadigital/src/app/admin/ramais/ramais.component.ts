import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SetorRamal } from '../../models/setor-ramal';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { NgFor } from '@angular/common';
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
  id: any;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getRamais();
  }

  getRamais() {
    this.http.get<SetorRamal[]>(`${this.url}/setor_ramal`)
      .subscribe(resultados => {
        this.setor_ramais = resultados;
        this.id = this.setor_ramais[1].id_setor;
      }
      );
  }
  getSetor(id:any) {
    this.http.get<SetorRamal[]>(`${this.url}/setor/${this.id}`)
      .subscribe(resultados => {
        this.setor_ramais = resultados;
      });
  }
}
