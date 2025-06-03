import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Ramal } from '../../models/ramal';
import { SetorRamal } from '../../models/setor-ramal';
import { RamalService } from '../../services/ramal.service';
import { SetorRamalService } from '../../services/setor-ramal.service';
import { SetorService } from '../../services/setor.service';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { Setor } from './../../models/setor';
import { ValidationSRUService } from '../../services/validation-sru.service';

@Component({
  selector: 'app-ramais',
  standalone: true,
  templateUrl: './ramais.component.html',
  styleUrl: './ramais.component.css',
  imports: [NavAdminComponent, NgFor, FormsModule, NgIf, NgStyle]
})
export class RamaisComponent {

  ramalDesabilitado = false;
  setor_ramais: SetorRamal[] = [];
  numero_ramal: Ramal[] = [];
  setores: Setor[] = [];

  ramal: string = '';
  setor: string = 'opcao1';
  setor_ramal: string = '';
  resposta: boolean = false;

  mensagem: string = '';
  validacao: string[] = [];

  setorramalSelecionado: SetorRamal | null = null;
  novoRamal: Ramal = { numero_ramal: this.ramal };
  novoSetorRamal: SetorRamal = {
    id_setor_ramal: '',
    id_setor: this.setor,
    id_ramal_setor: this.ramal,
    setor: ''
  };

  constructor(
    private readonly ramalService: RamalService,
    private readonly setorService: SetorService,
    private readonly setorRamalService: SetorRamalService,
    private readonly validationService: ValidationSRUService
  ) {
  } ngOnInit() {

    forkJoin({
      numero_ramal: this.ramalService.getRamal(),
    }).subscribe(({ numero_ramal }) => {
      this.numero_ramal = numero_ramal;
      this.getRamais();
    });

  } getRamais() {
    this.setorRamalService.getSetorRamal()
      .subscribe(resultados => {
        this.setor_ramais = resultados;
        this.getSetores();
      });
  } getSetores() {
    this.setorService.getSetor()
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
  } getTdHeight(numRows: number): string {
    if (numRows >= 1 && numRows <= 4) {
      const dataRows = numRows - 1;
      const remainingSpace = 18 - (dataRows * 4);
      return `${remainingSpace}rem`;
    } else {
      return 'auto';
    }
  } onChange(event: any) {
    const valorSelecionado = event.target.value;
    this.setor = valorSelecionado;
  } clear() {
    this.setor = 'opcao1';
    this.ramal = '';
    this.setorramalSelecionado = null;
    this.ramalDesabilitado = false;
  } async salvar() {
    const v = await this.validationService.authRamal(this.ramal, this.setor, this.setorramalSelecionado?.id_setor_ramal)

    this.validacao = v;
    if ((v).length === 0) {
      if (this.setorramalSelecionado) {
        this.atualizarSetorRamal();
      } else {
        this.adicionarNovoRamal();
      }

    } else {
      alert(this.validacao)
    }
  } adicionarNovoRamal() {
    this.novoRamal.numero_ramal = this.ramal;
    this.ramalService.addRamal(this.novoRamal)
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
      this.setorRamalService.addSetorRamal(this.novoSetorRamal)
        .subscribe(
          novoSetorRamal => {
            this.setor_ramais.push(novoSetorRamal);
            alert('Ramal adicionado com sucesso!')
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
  }
  // adicionarSetorRamal() {
  //   if (this.setorramalSelecionado) {
  //     this.atualizarRamal();
  //   } else {
  //     this.salvar();
  //   }
  // }
  atualizarSetorRamal() {
    if (!this.setorramalSelecionado) return;
    this.setorramalSelecionado.id_setor = this.setor;
    // this.setorramalSelecionado.id_ramal_setor = this.ramal;

    this.setorRamalService.updateSetorRamal(this.setorramalSelecionado)
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
      this.setorRamalService.deleteSetorRamal(setorramal.id_setor_ramal)
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
    this.ramalService.deleteRamal(ramal)
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
