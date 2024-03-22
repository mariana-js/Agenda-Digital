import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ramal } from '../../models/ramal';
import { SetorRamal } from '../../models/setor-ramal';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { Setor } from './../../models/setor';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ramais',
  standalone: true,
  templateUrl: './ramais.component.html',
  styleUrl: './ramais.component.css',
  imports: [HttpClientModule, NavAdminComponent, NgFor, FormsModule]
})
export class RamaisComponent {
  readonly url: string;

  setor_ramais: SetorRamal[] = [];
  numero_ramal: Ramal[] = [];
  setores: Setor[] = [];

  ramal: string = '';
  setor: string = 'opcao1';
  setor_ramal: string = '';
  resposta: boolean = false;

  novoRamal: Ramal = { numero_ramal: this.ramal };
  novoSetorRamal: SetorRamal = {
    id_setor_ramal: '',
    id_setor: this.setor,
    id_ramal_setor: this.ramal,
    setor: ''
  };

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {

    forkJoin({
      numero_ramal: this.http.get<Ramal[]>(`${this.url}/ramal`),
    }).subscribe(({ numero_ramal }) => {
      this.numero_ramal = numero_ramal;
      this.getRamais();
    });

  }

  getRamais() {
    this.http.get<SetorRamal[]>(`${this.url}/setor_ramal`)
      .subscribe(resultados => {
        this.setor_ramais = resultados;
        this.getSetores();
      });
  }

  getSetores() {
    this.http.get<Setor[]>(`${this.url}/setor`)
      .subscribe(resultados => {
        this.setores = resultados;
        this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));
        this.getNomeSetores();
      });
  }

  getNomeSetores() {
    this.setor_ramais.forEach(setor_ramal => {
      const setor = this.setores.find(setor => setor.id_setor === setor_ramal.id_setor);

      if (setor) {
        setor_ramal.setor = setor.nome_setor;
      } else {
        console.log('Erro ao trazer as informações!');
      }
    });
    this.setor_ramais.sort((a, b) => a.setor.localeCompare(b.setor));
  }

  adicionarRamal() {
    this.novoRamal.numero_ramal = this.ramal;
    const ramalExistente = this.numero_ramal.find(ramal =>
      ramal.numero_ramal.trim().toLowerCase() === this.novoRamal.numero_ramal.trim().toLowerCase()
    );
    if (ramalExistente) {
      alert('O ramal já está cadastrado.');
      this.resposta = false;
      return;
    }
    this.http.post<Ramal>(`${this.url}/ramal`, this.novoRamal)
      .subscribe(
        novoRamal => {
          this.numero_ramal.push(novoRamal);
          this.ramal = '';
          this.resposta = true;
          this.adicionarSetorRamal(this.resposta, this.novoRamal.numero_ramal);
        }
      );
  }

  onChange(event: any) {
    // Obtendo o valor selecionado
    const valorSelecionado = event.target.value;
    this.setor = valorSelecionado;
  }

  adicionarSetorRamal(resposta: boolean,ramal: string) {
    this.novoSetorRamal.id_setor = this.setor;
    this.novoSetorRamal.id_ramal_setor = ramal;
    if (resposta == true) {
      this.http.post<SetorRamal>(`${this.url}/setor_ramal`, this.novoSetorRamal)
        .subscribe(
          novoSetorRamal => {
            this.setor_ramais.push(novoSetorRamal);
            this.setor = 'opcao1';
            this.ramal = '';
            this.getRamais();
          }
        );
    } else {
      alert('Erro ao adicionar o ramal!')
    }
  }
}