import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Contato } from '../../models/contato';
import { Setor } from '../../models/setor';
import { FuncionarioService } from '../../services/funcionario.service';
import { SetorRamalService } from '../../services/setor-ramal.service';
import { SetorService } from '../../services/setor.service';
import { Funcionario } from './../../models/funcionario';
import { SetorRamal } from './../../models/setor-ramal';
import { PessoaService } from './../../services/pessoa.service';

@Component({
  selector: 'app-nav-aniversariantes',
  standalone: true,
  templateUrl: './nav-aniversariantes.component.html',
  styleUrl: './nav-aniversariantes.component.css',
  imports: [NgFor]
})
export class NavAniversariantesComponent implements OnInit {

  aniversariantes: Funcionario[] = [];
  contatos: Contato[] = [];
  setor_ramais: SetorRamal[] = [];
  setores: Setor[] = [];
  resposta: string = '';

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly setorRamalService: SetorRamalService,
    private readonly setorService: SetorService,
    private readonly funcionarioService: FuncionarioService
  ) {

  }

  ngOnInit() {
    forkJoin({
      contatos: this.pessoaService.getPessoa(),
      setor_ramais: this.setorRamalService.getSetorRamal(),
      setores: this.setorService.getSetor()

    }).subscribe(({ contatos, setor_ramais, setores }) => {
      this.contatos = contatos;
      this.setor_ramais = setor_ramais;
      this.setores = setores;
      this.getAniversariantes();
    });

  }

  getAniversariantes(): void {
    this.funcionarioService.getAniversariantes().subscribe(aniversariantes => {
      this.aniversariantes = aniversariantes.map(aniversariante => {
        const contato = this.contatos.find(contato => contato.id_pessoa === aniversariante.id_pessoa);
        const setorRamal = this.setor_ramais.find(setorRamal => setorRamal.id_setor_ramal === aniversariante.id_setor_ramal);
        const setor = setorRamal?.id_setor ? this.setores.find(setor => setor.id_setor === setorRamal.id_setor) : undefined;

        // Separando a data de nascimento em dia e mês
        const dataNascimento = new Date(aniversariante.data_nascimento);
        const dia = dataNascimento.getUTCDate().toString().padStart(2, '0');
        const mes = (dataNascimento.getUTCMonth() + 1).toString().padStart(2, '0');

        // Garantindo que o nome tenha no máximo duas palavras ou apenas a primeira se a segunda for uma das palavras específicas
        let nomeCompleto = contato?.nome_pessoa || 'Nome não encontrado';
        let nomeArray = nomeCompleto.split(' ');
        let palavrasEspecificas = ['de', 'dos', 'da', 'do'];

        let nomeDuasPalavras;
        if (nomeArray.length > 1 && palavrasEspecificas.includes(nomeArray[1].toLowerCase())) {
          nomeDuasPalavras = nomeArray[0];
        } else {
          nomeDuasPalavras = nomeArray.slice(0, 2).join(' ');
        }

        return {

          ...aniversariante,
          nome: nomeDuasPalavras,
          setor: setor?.nome_setor || 'Setor não encontrado',
          sigla: setor?.sigla_setor || 'Sigla não encontrada',
          dia: dia,
          mes: mes

        };
      }
      );
      if (this.aniversariantes.length === 0) {
        this.resposta = 'Sem aniversariantes neste mês.'
      }
    });

  }

}
