import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Ramal } from '../../models/ramal';
import { SetorRamal } from '../../models/setor-ramal';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { Setor } from './../../models/setor';

@Component({
  selector: 'app-ramais',
  standalone: true,
  templateUrl: './ramais.component.html',
  styleUrl: './ramais.component.css',
  imports: [HttpClientModule, NavAdminComponent, NgFor, FormsModule]
})
export class RamaisComponent {

  readonly url: string;
  ramalDesabilitado = false;
  setor_ramais: SetorRamal[] = [];
  numero_ramal: Ramal[] = [];
  setores: Setor[] = [];

  ramal: string = '';
  setor: string = 'opcao1';
  setor_ramal: string = '';
  resposta: boolean = false;

  setorramalSelecionado: SetorRamal | null = null;
  novoRamal: Ramal = { numero_ramal: this.ramal };
  novoSetorRamal: SetorRamal = {
    id_setor_ramal: '',
    id_setor: this.setor,
    id_ramal_setor: this.ramal,
    setor: ''
  };

  constructor(private http: HttpClient, private ngZone: NgZone) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {

    forkJoin({
      numero_ramal: this.http.get<Ramal[]>(`${this.url}/ramal`),
    }).subscribe(({ numero_ramal }) => {
      this.numero_ramal = numero_ramal;
      this.getRamais();
    });

  } getRamais() {
    this.http.get<SetorRamal[]>(`${this.url}/setor_ramal`)
      .subscribe(resultados => {
        this.setor_ramais = resultados;
        this.getSetores();
      });
  } getSetores() {
    this.http.get<Setor[]>(`${this.url}/setor`)
      .subscribe(resultados => {
        this.setores = resultados;
        this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));
        this.getNomeSetores();
      });
  } getNomeSetores() {
    this.setor_ramais.forEach(setor_ramal => {
      const setor = this.setores.find(setor => setor.id_setor === setor_ramal.id_setor);

      if (setor) {
        setor_ramal.setor = setor.nome_setor;
      } else {
        console.log('Erro ao trazer as informações!');
      }
    });
    this.setor_ramais.sort((a, b) => a.setor.localeCompare(b.setor));
  } onChange(event: any) {
    const valorSelecionado = event.target.value;
    this.setor = valorSelecionado;
  } clear() {
    this.setor = 'opcao1';
    this.ramal = '';
    this.setorramalSelecionado = null;
    this.ramalDesabilitado = false;
  } adicionarRamal() {
    if (this.setorramalSelecionado) {
      this.atualizarRamal();
    } else {
      this.adicionarNovoRamal();
    }
  } adicionarNovoRamal() {
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
          this.adicionarNovoSetorRamal(this.resposta, this.novoRamal.numero_ramal);
        }
      );
  } adicionarNovoSetorRamal(resposta: boolean, ramal: string) {
    this.novoSetorRamal.id_setor = this.setor;
    this.novoSetorRamal.id_ramal_setor = ramal;
    if (resposta == true) {
      this.http.post<SetorRamal>(`${this.url}/setor_ramal`, this.novoSetorRamal)
        .subscribe(
          novoSetorRamal => {
            this.setor_ramais.push(novoSetorRamal);
            this.clear();
            this.getRamais();
          }
        );
    } else {
      alert('Erro ao adicionar o ramal!')
    }
  } selecionarSetorRamal(setorramal: SetorRamal) {
    this.ramalDesabilitado = true;
    this.setorramalSelecionado = { ...setorramal };
    this.setor = setorramal.id_setor;
    this.ramal = setorramal.id_ramal_setor;

    // Encontrar o nome do setor com base no ID
    const nomeSetor = this.setores.find(setor => setor.id_setor === this.setor);
    if (nomeSetor) {
      // Definir o valor selecionado na caixa de seleção
      const setorSelecionado = this.setores.find(setor => setor.nome_setor === nomeSetor.nome_setor);
      if (setorSelecionado) {
        this.setor = setorSelecionado.id_setor;
      } else {
        console.error('Setor não encontrado na lista de setores.');
      }
    } else {
      console.error('Nome do setor não encontrado.');
    }
  } adicionarSetorRamal() {
    if (this.setorramalSelecionado) {

      this.atualizarRamal();
    } else {
      this.adicionarRamal();
    }
  } atualizarRamal() {

    if (!this.setorramalSelecionado) return;
    this.setorramalSelecionado.id_setor = this.setor;
    this.setorramalSelecionado.id_ramal_setor = this.ramal;
    const setorExistente = this.setor_ramais.some(setorramal =>
      setorramal.id_setor.trim().toLowerCase() === this.setor.trim().toLowerCase() &&
      setorramal.id_setor !== this.setorramalSelecionado?.id_setor
    );

    if (setorExistente) {
      alert('O setor já está vinculado a este ramal.');
      return;
    }

    const ramalExistente = this.setor_ramais.some(ramal =>
      ramal.id_ramal_setor.trim().toLowerCase() === this.ramal.trim().toLowerCase() &&
      ramal.id_ramal_setor !== this.setorramalSelecionado?.id_ramal_setor
    );

    if (ramalExistente) {
      alert('O ramal já está cadastrado!');
      return;
    }
    // Atualizar o setor apenas se nenhum nome ou sigla existir
    this.setorramalSelecionado.id_setor = this.setor;
    this.setorramalSelecionado.id_ramal_setor = this.ramal;

    this.http.put<Ramal>(`${this.url}/ramal/${this.setorramalSelecionado.id_ramal_setor}`, this.setorramalSelecionado)

    this.http.put<SetorRamal>(`${this.url}/setor_ramal/${this.setorramalSelecionado.id_setor_ramal}`, this.setorramalSelecionado)
      .subscribe(
        () => {
          alert('Setor do ramal atualizado com sucesso!');
          this.clear();
          this.getRamais();
        },
        error => {
          console.error('Erro ao atualizar o setor do ramal:', error);
          alert('Erro ao alterar Setor do ramal!');
        }
      );

  } excluirSetorRamal(setorramal: SetorRamal) {
    const n_ramal = setorramal.id_ramal_setor;
    if (confirm('Tem certeza de que deseja excluir este ramal?')) {
      this.http.delete(`${this.url}/setor_ramal/${setorramal.id_setor_ramal}`)
        .subscribe(
          () => {
            this.setor_ramais = this.setor_ramais.filter(s => s.id_setor_ramal !== setorramal.id_setor_ramal);
            this.excluirRamal(n_ramal);
            this.clear();
            this.getRamais();
            alert('Ramal excluído com sucesso!');
          },
          error => {
            this.getRamais();
            console.error('Erro ao excluir o ramal:', error);
            alert('Erro ao excluir ramal!');
          }
        );
    }
  } excluirRamal(ramal: string) {
    this.http.delete(`${this.url}/ramal/${ramal}`)
      .subscribe(
        () => {
          this.numero_ramal = this.numero_ramal.filter(s => s.numero_ramal !== ramal);
        },
        error => {
          console.error('Erro ao excluir o ramal:', error);
        }
      );
  }
}
