import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Endereco } from '../../models/endereco';
import { Funcionario } from '../../models/funcionario';
import { Setor } from '../../models/setor';
import { SetorRamal } from '../../models/setor-ramal';
import { EnderecoService } from '../../services/endereco.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { PessoaService } from '../../services/pessoa.service';
import { SetorRamalService } from '../../services/setor-ramal.service';
import { SetorService } from '../../services/setor.service';
import { Contato } from './../../models/contato';
@Component({
  selector: 'app-contato',
  standalone: true,
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
  imports: [],
})
export class ContatoComponent implements OnInit {

  @ViewChild('celular1Input') celular1Input!: ElementRef;
  @ViewChild('celular2Input') celular2Input!: ElementRef;
  @ViewChild('celular3Input') celular3Input!: ElementRef;
  @ViewChild('telefoneInput') telefoneInput!: ElementRef;
  @ViewChild('cepInput') cepInput!: ElementRef;

  contato: Contato[] = [];
  funcionario: Funcionario[] = [];
  setor_ramais: SetorRamal[] = [];
  setores: Setor[] = [];
  endereco: Endereco[] = [];

  // Dados do contato
  nome: string | undefined;
  email: string | undefined;
  celular1: string | undefined;
  celular2: string | undefined;
  celular3: string | undefined;
  telefone: string | undefined;

  // Dados do endereco
  logradouro: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  estado: string | undefined;
  uf: string | undefined;
  cep: string | undefined;

  // Dados do setor
  nome_setor: string | undefined;
  sigla: string | undefined;
  ramal: string | undefined;
  contatoSelecionado: Contato | null = null;

  id_rota: string | undefined;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly pessoaService: PessoaService,
    private readonly setorRamalService: SetorRamalService,
    private readonly setorService: SetorService,
    private readonly funcionarioService: FuncionarioService,
    private readonly enderecoService: EnderecoService
  ) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.id_rota = params['id'];
      window.scrollTo(0, 0);
      if (this.id_rota) {
        forkJoin({
          contato: this.pessoaService.getPessoa(),
          funcionario: this.funcionarioService.getFuncionario(),
          setor_ramais: this.setorRamalService.getSetorRamal(),
          setores: this.setorService.getSetor(),
          endereco: this.enderecoService.getEndereco()
        }).subscribe(({ contato, funcionario, setor_ramais, setores, endereco }) => {
          this.contato = contato;
          this.funcionario = funcionario;
          this.setor_ramais = setor_ramais;
          this.setores = setores;
          this.endereco = endereco;
          this.getInformacoes();
        });
      }
    });
  }
  mask() {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        import('inputmask').then(Inputmask => {
          Inputmask.default({
            mask: ['(99) 9999-9999', '(99) 99999-9999'],
            showMaskOnHover: false,
            clearMaskOnLostFocus: true,
            numericInput: true // Aceita apenas números
          }).mask(this.celular1Input.nativeElement);
          Inputmask.default({
            mask: ['(99) 9999-9999', '(99) 99999-9999'],
            showMaskOnHover: false,
            clearMaskOnLostFocus: true,
            // Aceita apenas números
          }).mask(this.celular2Input.nativeElement);
          Inputmask.default({
            mask: ['(99) 9999-9999', '(99) 99999-9999'],
            showMaskOnHover: false,
            clearMaskOnLostFocus: true,
            numericInput: true // Aceita apenas números
          }).mask(this.celular3Input.nativeElement);
          Inputmask.default({
            mask: ['(99) 9999-9999', '(99) 99999-9999'],
            showMaskOnHover: false,
            clearMaskOnLostFocus: true,
            numericInput: true // Aceita apenas números
          }).mask(this.telefoneInput.nativeElement);
          Inputmask.default({
            mask: '99999-999',
            showMaskOnHover: false,
            clearMaskOnLostFocus: true,
            numericInput: true
          }).mask(this.cepInput.nativeElement);
        });
      }
    }, 0);
  }
  getInformacoes() {
    const id_contato = this.id_rota;
    // Dados da pessoa
    const informacoesContato = this.contato.find(pessoa => pessoa.id_pessoa === id_contato);
    if (informacoesContato !== undefined) {
      this.nome = informacoesContato.nome_pessoa;
      this.email = informacoesContato.email ?? '';
      this.celular1 = informacoesContato.celular1;
      this.celular2 = informacoesContato.celular2;
      this.celular3 = informacoesContato.celular3;
      this.telefone = informacoesContato.telefone;
    }

    // Dados do endereco da pessoa
    const endereco = this.endereco.find(endereco => endereco.id_pessoa === id_contato);
    if (endereco !== undefined) {
      this.logradouro = endereco.logradouro;
      this.bairro = endereco.bairro;
      this.cidade = endereco.cidade;
      this.estado = `${endereco.estado} -`;
      this.uf = endereco.uf;
      this.cep = endereco.cep;
    }

    // Dados do funcionario
    const funcionario = this.funcionario.find(funcionario => funcionario.id_pessoa === id_contato)
    if (funcionario !== undefined) {
      const setor_ramal = this.setor_ramais.find(setor_ramal => setor_ramal.id_setor_ramal === funcionario?.id_setor_ramal)
      const setor = this.setores.find(setor => setor_ramal?.id_setor === setor.id_setor)
      this.nome_setor = `${setor?.nome_setor} -`;
      this.sigla = setor?.sigla_setor;
      this.ramal = `Ramal: ${setor_ramal?.id_ramal_setor}`;
    }
    this.mask();
  }
}
