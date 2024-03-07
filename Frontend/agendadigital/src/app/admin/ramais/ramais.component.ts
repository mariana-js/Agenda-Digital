import { NgFor, NgForOf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Setor } from '../../models/setor';
import { SetorRamal } from '../../models/setor-ramal';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
@Component({
  selector: 'app-ramais',
  standalone: true,
  templateUrl: './ramais.component.html',
  styleUrl: './ramais.component.css',
  imports: [HttpClientModule, NavAdminComponent, NgFor, NgForOf]
})
export class RamaisComponent {
  readonly url: string;
  setor_ramais: SetorRamal[] = [];

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

        this.setor_ramais.forEach(ramal => {

          this.getSetor(ramal.id_setor).subscribe(setor => {
            ramal.id_setor = setor.nome_setor;
          });
        });
      }
      );

  }
  getSetor(id_setor: string) {
    return this.http.get<Setor[]>(`${this.url}/setor/${id_setor}`);
  }
}
