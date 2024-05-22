import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Contato } from '../../models/contato';
import { Funcionario } from '../../models/funcionario';
import { Setor } from '../../models/setor';
import { SetorRamal } from '../../models/setor-ramal';

@Component({
  selector: 'app-nav-aniversariantes',
  standalone: true,
  templateUrl: './nav-aniversariantes.component.html',
  styleUrl: './nav-aniversariantes.component.css',
  imports: [NgFor, HttpClientModule]
})
export class NavAniversariantesComponent implements OnInit {
  readonly url: string;
  aniversariantes: Funcionario[] = [];
  contatos: Contato[] = [];
  setor_ramais: SetorRamal[] = [];
  setores: Setor[] = [];
  resposta: string = '';

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  ngOnInit() {
    forkJoin({
      contatos: this.http.get<Contato[]>(`${this.url}/pessoa`),
      setor_ramais: this.http.get<SetorRamal[]>(`${this.url}/setor_ramal`),
      setores: this.http.get<Setor[]>(`${this.url}/setor`)

    }).subscribe(({ contatos, setor_ramais, setores }) => {
      this.contatos = contatos;
      this.setor_ramais = setor_ramais;
      this.setores = setores;
      this.getAniversariantes();
    });
   
  }

  getAniversariantes(): void {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
   this.http.get<Funcionario[]>(`${this.url}/funcionario?mes=${mesAtual}`).subscribe(aniversariantes => {
      this.aniversariantes = aniversariantes.map(aniversariante => {
        const contato = this.contatos.find(contato => contato.id_pessoa === aniversariante.id_pessoa);
        const setorRamal = this.setor_ramais.find(setorRamal => setorRamal.id_setor_ramal === aniversariante.id_setor_ramal);
        const setor = setorRamal?.id_setor ? this.setores.find(setor => setor.id_setor === setorRamal.id_setor) : undefined;

        // Separando a data de nascimento em dia e mês
        const dataNascimento = new Date(aniversariante.data_nascimento);
        const dia = dataNascimento.getUTCDate().toString().padStart(2, '0');
        const mes = (dataNascimento.getUTCMonth() + 1).toString().padStart(2, '0');

        console.log(setor?.sigla_setor)
        return {
          ...aniversariante,
          nome: contato?.nome_pessoa || 'Nome não encontrado',
          setor: setor?.nome_setor || 'Setor não encontrado',
          sigla: setor?.sigla_setor || 'Sigla não encontrada',
          dia: dia,
          mes: mes

        };
      }
      );
      if(this.aniversariantes.length === 0){       
        this.resposta = 'Sem aniversariantes neste mês.'
      }
    });
    
  }

}
