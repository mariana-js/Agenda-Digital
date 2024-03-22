import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Setor } from '../../models/setor';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-setores',
  standalone: true,
  templateUrl: './setores.component.html',
  styleUrl: './setores.component.css',
  imports: [NavAdminComponent, NgFor, HttpClientModule, FormsModule]
})
export class SetoresComponent {
  readonly url: string;
  setor: string = '';
  sigla: string = '';

  setores: Setor[] = [];
  novoSetor: Setor = { id_setor: '', nome_setor: this.setor, sigla_setor: this.sigla };

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getSetores();
    
  }

  getSetores() {
    this.http.get<Setor[]>(`${this.url}/setor`)
      .subscribe(resultados => {
        this.setores = resultados;
        this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));

      });
  }
  clear() {
    this.setor = '';
    this.sigla = '';
  }

  adicionarSetor() {
    this.novoSetor.nome_setor = this.setor;
    this.novoSetor.sigla_setor = this.sigla;

    // Verificar se o setor já existe localmente
    const setorExistente = this.setores.find(setor =>
      setor.nome_setor.trim().toLowerCase() === this.novoSetor.nome_setor.trim().toLowerCase()
    );

    if (setorExistente) {
      // Se setorExistente não for undefined, um setor correspondente foi encontrado na lista
      alert('O setor já existe.');
      return; // Parar a execução da função se o setor já existir localmente
    }
    this.http.post<Setor>(`${this.url}/setor`, this.novoSetor)
      .subscribe(
        novoSetor => {
          this.setores.push(novoSetor);
          this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));
          this.clear();
        }
      );

    }



}
