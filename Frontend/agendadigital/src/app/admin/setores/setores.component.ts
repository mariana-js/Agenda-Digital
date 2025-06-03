import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Setor } from '../../models/setor';
import { SetorService } from '../../services/setor.service';
import { ValidationSRUService } from '../../services/validation-sru.service';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
@Component({
  selector: 'app-setores',
  standalone: true,
  templateUrl: './setores.component.html',
  styleUrl: './setores.component.css',
  imports: [NavAdminComponent, NgFor, FormsModule, NgIf, NgStyle]
})
export class SetoresComponent {
  id: string = '';
  setor: string = '';
  sigla: string = '';
  mensagem: string = '';
  validacao: string[] = [];

  setores: Setor[] = [];
  setorSelecionado: Setor | null = null;
  novoSetor: Setor = { id_setor: '', nome_setor: this.setor, sigla_setor: this.sigla };

  constructor(
    private readonly setorService: SetorService,
    private readonly validationService: ValidationSRUService

  ) {
  } ngOnInit() {
    this.getSetores();

  } getTdHeight(numRows: number): string {
    if (numRows >= 1 && numRows <= 4) {
      const dataRows = numRows - 1;
      const remainingSpace = 18 - (dataRows * 4);
      return `${remainingSpace}rem`;
    } else {
      return 'auto';
    }
  } getSetores() {
    this.setorService.getSetor()
      .subscribe(resultados => {
        this.setores = resultados;
        this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));
        this.clear();
      });
  } clear() {
    this.setorSelecionado = null;
    this.setor = '';
    this.sigla = '';
  } async salvar() {
    const v = await this.validationService.authSetor(this.setor, this.sigla)

    this.validacao = v;
    if ((v).length === 0) {


      if (this.setorSelecionado) {
        this.atualizarSetor();
      } else {
        this.adicionarNovoSetor();
      }

    } else {
      alert(this.validacao)
    }
  } adicionarNovoSetor() {
    this.novoSetor.nome_setor = this.setor;
    this.novoSetor.sigla_setor = this.sigla;

    this.setorService.addSetor(this.novoSetor)
      .subscribe(
        novoSetor => {
          this.setores.push(novoSetor);
          alert('Setor adicionado com sucesso!')
          this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));
          this.clear();
          this.getSetores();
        },
        error => {
          console.error('Erro ao adicionar setor:', error);
        }
      );
  } selecionarSetor(setor: Setor) {
    this.setorSelecionado = { ...setor };
    this.setor = setor.nome_setor;
    this.sigla = setor.sigla_setor;
  } atualizarSetor() {
    if (!this.setorSelecionado) return;
    this.setorSelecionado.sigla_setor = this.sigla;
    this.setorSelecionado.nome_setor = this.setor;

    this.setorService.updateSetor(this.setorSelecionado)
      .subscribe(
        () => {
          alert('Setor atualizado com sucesso!');
          this.clear();
          this.setorSelecionado = null;
          this.getSetores();
        },
        error => {
          console.error('Erro ao atualizar setor:', error);
          alert('Erro ao atualizar setor!');
        }
      );
  } excluirSetor(setor: Setor) {
    if (confirm('Tem certeza de que deseja excluir este setor?')) {
      this.setorService.deleteSetor(setor.id_setor)
        .subscribe(
          () => {
            this.setores = this.setores.filter(s => s.id_setor !== setor.id_setor);
            this.getSetores();
            alert('Setor excluído com sucesso!');
          },
          error => {

            this.getSetores();
            console.error('Erro ao excluir setor:', error);
            alert('Erro ao excluir setor!');
          }
        );
    }
  }
}
