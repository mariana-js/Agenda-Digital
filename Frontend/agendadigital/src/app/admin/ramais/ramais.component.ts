import { NgFor, NgForOf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SetorRamal } from '../../models/setor-ramal';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { Setor } from './../../models/setor';
import { forkJoin } from 'rxjs';
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

        const requests = this.setor_ramais.map(ramal => {
          return this.getSetor(ramal.id_setor);
        });

        forkJoin(requests).subscribe((setores: Setor[][]) => {
          this.setor_ramais.forEach((ramal, index) => {
            const setor = setores[index][2]; // Primeiro elemento do array de setores
            if (setor) {
              ramal.setor = setor.nome_setor;
            } else {
              ramal.setor = "Setor não encontrado"; // Ou faça algo caso o setor não seja encontrado
            }
          });
        });
      });



      // console.log('Id do setor: ' )
      // console.log("Retorno da função getSetor(): " + this.getSetor(ramal.id_setor))
  }
  getSetor(id_setor: string) {
    return this.http.get<Setor[]>(`${this.url}/setor/${id_setor}`);
  }

  getSetores() {
    return this.http.get<Setor[]>(`${this.url}/setor`);
  }
}
