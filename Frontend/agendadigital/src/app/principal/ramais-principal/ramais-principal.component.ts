import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Contato } from '../../models/contato';
import { Funcionario } from '../../models/funcionario';
import { Ramal } from '../../models/ramal';
import { Setor } from '../../models/setor';
import { SetorRamal } from '../../models/setor-ramal';
import { FuncionarioService } from '../../services/funcionario.service';
import { PessoaService } from '../../services/pessoa.service';
import { SetorRamalService } from '../../services/setor-ramal.service';
import { SetorService } from '../../services/setor.service';
  interface Ramais  {
  usuario: string;
  setor: string;
  ramal: string;
  }
@Component({
  selector: 'app-ramais-principal',
  standalone: true,
  imports: [NgFor, HttpClientModule, NgIf, NgStyle, NgClass],
  templateUrl: './ramais-principal.component.html',
  styleUrl: './ramais-principal.component.css'
})

export class RamaisPrincipalComponent {
  ramais: Ramais[] = [];
  usuarios: Funcionario[] = [];
  str: SetorRamal[] = [];
  setor: Setor[] = [];
  contato: Contato[] = [];
  filteredRamais: Ramais[] = [];
  selectedSectorButton: string = 'Todos';

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly setorRamalService: SetorRamalService,
    private readonly setorService: SetorService,
    private readonly funcionarioService: FuncionarioService,
  ) {
  }

  ngOnInit() {
    forkJoin({
      contato: this.pessoaService.getPessoa(),
      usuarios: this.funcionarioService.getFuncionario(),
      str: this.setorRamalService.getSetorRamal(),
      setor: this.setorService.getSetor(),
    }).subscribe(({ contato, usuarios, str, setor }) => {
      this.contato = contato;
      this.usuarios = usuarios;
      this.str = str;
      this.setor = setor;
      this.setor.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));
      this.getRamais();
    });
  }
  findSetorById(setores: Setor[], id: string): Setor | undefined {
    return setores.find(setor => setor.id_setor === id);
  }
  getTdHeight(numRows: number): string {
    if (numRows >= 1 && numRows <= 4) {
      const dataRows = numRows - 1;
      const remainingSpace = 18 - (dataRows * 4);
      return `${remainingSpace}rem`;
    } else {
      return 'auto';
    }
  }

  getRamais() {
    this.ramais = this.usuarios.map(usuario => {
      const setorRamal = this.str.find(sr => sr.id_setor_ramal === usuario.id_setor_ramal);

      const contato = this.contato.find(c => c.id_pessoa === usuario.id_pessoa);

      if (setorRamal && contato) {
        const setor = this.findSetorById(this.setor, setorRamal.id_setor);

        if (setor) {
          return {
            usuario: contato?.nome_pessoa,
            ramal: setorRamal.id_ramal_setor,
            setor: setor.nome_setor
          };
        }
      }
      return {
        usuario: '',
        ramal: '',
        setor: ''
      };
    });
    this.ramais.sort((a, b) => a.usuario.localeCompare(b.usuario));
    this.filteredRamais = [...this.ramais];
  }

  filterRamaisBySetor(setorNome: string, buttonId: string) {
    if (setorNome === 'Todos') {
      this.selectedSectorButton = 'Todos';
    } else {
      this.selectedSectorButton = buttonId;
    }

    this.filteredRamais = this.ramais.filter(ramal => ramal.setor === setorNome);
  }

  showAllRamais() {
    this.selectedSectorButton = 'Todos';
    this.filteredRamais = [...this.ramais];
  }
}
