import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Contato } from '../../models/contato';
import { Endereco } from '../../models/endereco';
import { Funcionario } from '../../models/funcionario';
import { Setor } from '../../models/setor';
import { ContatoStateService } from '../../services/contato-state.service';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { RamaisComponent } from '../ramais/ramais.component';
import { SetorRamal } from './../../models/setor-ramal';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-cadatrar-contato',
  standalone: true,
  templateUrl: './cadatrar-contato.component.html',
  styleUrl: './cadatrar-contato.component.css',
  imports: [NavAdminComponent, NgFor, HttpClientModule, FormsModule, RamaisComponent, NgClass, NgIf]
})
export class CadatrarContatoComponent {

  @ViewChild('celular1Input') celular1Input!: ElementRef;
  @ViewChild('celular2Input') celular2Input!: ElementRef;
  @ViewChild('celular3Input') celular3Input!: ElementRef;
  @ViewChild('telefoneInput') telefoneInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('cepInput') cepInput!: ElementRef;

  readonly url: string;
  id_rota: string | undefined;
  resposta: string = "";
  validacao: boolean = false;

  setores: Setor[] = [];
  contatos: Contato[] = [];
  enderecos: Endereco[] = [];
  setor_ramais: SetorRamal[] = [];
  funcionarios: Funcionario[] = [];
  ramaisFiltrados: SetorRamal[] = [];

  celular1Existente: any;
  nomeExistente: Contato | undefined;
  emailExistente: Contato | undefined;

  setorSelecionado: Setor | null = null;
  ramalSelecionado: SetorRamal | null = null;
  contatoSelecionado: Contato | null = null;
  enderecoSelecionado: Endereco | null = null;
  funcionarioSelecionado: Funcionario | null = null;

  //Contato
  nome_pessoa: string = '';
  email: string = '';
  celular1: string = '';
  celular2: string = '';
  celular3: string = '';
  telefone: string = '';
  boxPrivate: boolean = false;
  box_fun: boolean = false;

  novoContato: Contato = {
    id_pessoa: '',
    nome_pessoa: this.nome_pessoa,
    email: this.email,
    celular1: this.celular1,
    celular2: this.celular2,
    celular3: this.celular3,
    telefone: this.telefone,
    flag_privado: this.boxPrivate,
    flag_funcionario: this.box_fun
  };

  // Endereco
  id_contato: string = '';
  logradouro: string = '';
  numero: string = '';
  estado: string = '';
  cidade: string = '';
  bairro: string = '';
  uf: string = '';
  cep: string = '';

  novoEndereco: Endereco = {
    id_endereco: '',
    id_pessoa: this.id_contato,
    logradouro: this.logradouro,
    numero: this.numero,
    estado: this.estado,
    cidade: this.cidade,
    bairro: this.bairro,
    uf: this.uf,
    cep: this.cep
  }
  // Funcionario
  id_setor_ramal: string = '';
  data_nascimento: string = '';
  setor: string = 'op';
  nramal: string = 'op2';
  foto: File | null = null;

  novoFuncionario: Funcionario = {
    id_funcionario: '',
    id_setor_ramal: this.id_setor_ramal,
    id_pessoa: this.id_contato,
    nome: '',
    setor: '',
    data_nascimento: this.data_nascimento,
    dia: '',
    mes: '',
    foto: this.foto,
    sigla: ''
  }
capitalize(text: string): string {
  return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private contatoStateService: ContatoStateService,
  ) {
    this.url = 'http://localhost:8080';

  } ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id_rota = params['id'];
      this.estados();
      this.checkbox();
      this.getSetores();
      this.getSetorRamal();

      forkJoin({
        contatos: this.http.get<Contato[]>(`${this.url}/pessoa`),
        enderecos: this.http.get<Endereco[]>(`${this.url}/endereco`),
        funcionarios: this.http.get<Funcionario[]>(`${this.url}/funcionario/all`),
        setor_ramais: this.http.get<SetorRamal[]>(`${this.url}/setor_ramal`),

      }).subscribe(({ contatos, enderecos, funcionarios, setor_ramais }) => {
        this.contatos = contatos;
        this.enderecos = enderecos;
        this.funcionarios = funcionarios;
        this.setor_ramais = setor_ramais;
        if (this.id_rota) {
          this.getInformacoes();
        }
      });
    });

  } ngAfterViewInit() {
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
        Inputmask.default({ regex: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+" }).mask(this.emailInput.nativeElement);
        Inputmask.default({
          mask: '99999-999',
          showMaskOnHover: false,
          clearMaskOnLostFocus: true,
          numericInput: true
        }).mask(this.cepInput.nativeElement);
      });
    }
  } ngOnDestroy() {
    this.contatoStateService.clearContatoSelecionado();
  } getSetores() {
    this.http.get<Setor[]>(`${this.url}/setor`)
      .subscribe(resultados => {
        this.setores = resultados;
        this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));
      });
  } selecionarSetor(event: Event) {
    const idSetor = (event.target as HTMLSelectElement).value;
    this.getRamaisPorSetor(idSetor);
    this.setor = idSetor;
  } selecionarRamal(event: Event) {
    const nramal = (event.target as HTMLSelectElement).value;
    this.nramal = nramal;
  } getRamaisPorSetor(idSetor: string) {
    this.ramaisFiltrados = this.setor_ramais.filter(ramal => ramal.id_setor === idSetor);
  } getSetorRamal() {
    this.http.get<SetorRamal[]>(`${this.url}/setor_ramal`)
      .subscribe(resultados => {
        this.setor_ramais = resultados;
      })
  } checkbox() {
    const checkbox = document.getElementById('box_fun') as HTMLInputElement;
    const sectorSelect = document.querySelector("select[name=sector]") as HTMLSelectElement;
    const ramalSelect = document.querySelector("select[name=ramal]") as HTMLSelectElement;
    const checkboxPrivate = document.getElementById('boxPrivate') as HTMLInputElement;
    checkboxPrivate.addEventListener('change', (event) => {
      this.boxPrivate = checkboxPrivate.checked;
    });
    sectorSelect.disabled = true;
    checkbox.addEventListener('change', (event) => {
      const target = event.currentTarget as HTMLInputElement;
      if (target.checked) {
        sectorSelect.disabled = false;
        ramalSelect.disabled = false;
      } else {
        sectorSelect.disabled = true;
        ramalSelect.disabled = true;
      }
    });
  } estados() {
    // Salvar uma referência à instância da classe
    const self = this;

    // Objeto para mapear o UF de cada estado
    const stateUFs: { [key: string]: string } = {};

    // Função para popular as UF
    async function populateUFs() {
      const ufSelect = document.querySelector<HTMLSelectElement>("select[name=uf]") ?? document.createElement("select");
      const states = await (await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")).json();

      states.sort((a: any, b: any) => a.nome.localeCompare(b.nome));

      // Adicionando a opção "Selecione o Estado" como a primeira opção
      ufSelect.innerHTML = `<option value="">Selecione o Estado</option>`;

      // Adicionando as opções dos estados
      states.forEach((state: any) => {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        // Mapeia o UF de cada estado
        stateUFs[state.nome] = state.sigla;
      });
    }
    // Função para obter as cidades
    async function getCities(event: Event) {
      const target = event.target as HTMLSelectElement;
      const ufId = target.value;
      const ufName = target.options[target.selectedIndex].text;

      // Obtém o UF correspondente ao estado selecionado
      const uf1 = stateUFs[ufName];

      // Agora você pode usar 'uf' conforme necessário
      self.uf = uf1;
      self.estado = ufName;
      // Limpa o valor anterior da cidade
      self.cidade = '';

      // Restante do código para obter e mostrar as cidades...
      const stateInput = document.querySelector<HTMLInputElement>("input[name=state]") ?? document.createElement("input");
      const citySelect = document.querySelector<HTMLSelectElement>("select[name=city]") ?? document.createElement("select");

      stateInput.value = ufName;

      const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`;
      const response = await fetch(url);
      const cities = await response.json();

      // Limpa o conteúdo atual do select de cidades
      citySelect.innerHTML = "";

      // Adiciona a opção "Selecione a Cidade" como a primeira opção
      citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`;

      // Adiciona as opções das cidades
      cities.forEach((city: any) => {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      });

      citySelect.disabled = false;

      // Adiciona um ouvinte de evento para atualizar o valor da cidade quando o usuário selecionar uma opção na lista de cidades
      citySelect.addEventListener('change', (event) => {
        const selectedCity = (event.target as HTMLSelectElement).value; // Obtém o valor da cidade selecionada pelo usuário
        self.cidade = selectedCity; // Define a cidade com a cidade selecionada pelo usuário
      });
    }

    // Adicionando evento de mudança para as UF
    document.querySelector("select[name=uf]")?.addEventListener("change", getCities);

    // Populando as UF
    populateUFs();
  } removerCaracteresEspeciais(str: string): string {
    return str.replace(/[^0-9]/g, '');// Remove todos os caracteres que não são letras, números, espaços ou sublinhados
  } verificarNumeros(str: any) {
    const num = Number(str.replace(/\D/g, ''));
    if (!isNaN(num)) {
      return /^\d+$/.test(String(num));
    }

    return false;
  } validation2() {
    if (!this.nome_pessoa) return false;
    if (!this.celular1) return false;
    if (!this.verificarNumeros(this.celular1) || !this.verificarNumeros(this.celular2) || !this.verificarNumeros(this.telefone)) return false;
    if (this.cep && (this.removerCaracteresEspeciais(this.cep).length !== 8 || !this.verificarNumeros(this.removerCaracteresEspeciais(this.cep)))) return false;
    const setorRamalEncontrado = this.setor_ramais.find(setorRamal =>
      setorRamal.id_setor === this.setor && setorRamal.id_ramal_setor === this.nramal
    );
    if (this.box_fun === true && !setorRamalEncontrado) {
      alert('Por favor, selecione o setor e o ramal do(a) funcionário(a)!')
      return false;
    }
    if (this.numero.length > 0 && !this.verificarNumeros(this.numero)) return false;
    this.novoContato.nome_pessoa = this.nome_pessoa;
    this.novoContato.email = this.email;
    this.novoContato.celular1 = this.celular1;
    this.novoContato.celular2 = this.celular2;
    this.novoContato.telefone = this.telefone;
    this.novoContato.flag_privado = this.boxPrivate;
    this.novoContato.flag_funcionario = this.box_fun;
    const contatoSelecionado = this.contatos.find(contato => contato.id_pessoa === this.id_rota);
    const nomeExistente = this.contatos.find(pessoa =>
      pessoa.nome_pessoa.trim().toLowerCase() === this.novoContato.nome_pessoa.trim().toLowerCase() &&
      pessoa.id_pessoa !== contatoSelecionado?.id_pessoa
    );
    if (nomeExistente) return false;
    const emailExistente = this.contatos.find(pessoa =>
      pessoa.email.trim().toLowerCase() === this.novoContato.email.trim().toLowerCase() &&
      pessoa.email !== contatoSelecionado?.email
    );
    if (emailExistente && this.email) return false;
    const celular1Existente = this.contatos.find(pessoa =>
      pessoa.celular1.trim().toLowerCase() === this.novoContato.celular1.trim().toLowerCase() &&
      pessoa.celular1 !== contatoSelecionado?.celular1
    );
    if (celular1Existente) return false;
    return true;
  } validation(fieldName: string) {
    const contatoSelecionado = this.contatos.find(contato => contato.id_pessoa === this.id_rota);
    switch (fieldName) {
      case 'nome_pessoa':
        if (!this.nome_pessoa) return;
        const nomeExistente = this.contatos.find(pessoa =>
          pessoa.nome_pessoa.trim().toLowerCase() === this.nome_pessoa.trim().toLowerCase() &&
          pessoa.id_pessoa !== contatoSelecionado?.id_pessoa
        );
        this.nomeExistente = nomeExistente;
        if (nomeExistente) return;

        break;
      case 'email':
        if (this.email && (!this.email.includes('@') || this.email.split('@')[1].length === 1)) return false;
        const emailExistente = this.contatos.find(pessoa =>
          pessoa.email.trim().toLowerCase() === this.email.trim().toLowerCase() &&
          pessoa.email !== contatoSelecionado?.email
        );
        this.emailExistente = emailExistente;
        
        if (this.email && emailExistente && (emailExistente !== undefined)) return;
        break;
      case 'celular1':
        const celular1Existente = this.contatos.find(pessoa =>
          pessoa.celular1.trim().toLowerCase() === this.removerCaracteresEspeciais(this.celular1).trim().toLowerCase() &&
          pessoa.celular1 !== contatoSelecionado?.celular1
        );
        this.celular1Existente = celular1Existente;
        if (celular1Existente) return;
        break;
      case 'cep':
        if (this.cep && (this.removerCaracteresEspeciais(this.cep).length !== 8 || !this.verificarNumeros(this.cep))) return;
        break;
      case 'numero':
        if (this.numero && this.numero.length > 5) return;
        break;
    }
    return true;
  } clear() {
    this.nome_pessoa = '';
    this.email = '';
    this.celular1 = '';
    this.celular2 = '';
    this.telefone = '';
    this.boxPrivate = false;
    this.box_fun = false;

    this.logradouro = '';
    this.numero = '';
    this.bairro = '';
    this.cep = '';

    this.nramal = 'op2';
    this.setor = 'op';
    this.data_nascimento = '';
  } salvar() {
    const contatoSelecionado = this.id_rota;
    const contato = this.contatos.find(contato => contatoSelecionado === contato.id_pessoa);
    const enderecoContatoSelecionando = this.enderecos.find(endereco => contatoSelecionado === endereco.id_pessoa);
    const funcionarioSelecionado = this.funcionarios.find(funcionario => contatoSelecionado === funcionario.id_pessoa);
    if (this.validation2() === true) {
      if (contatoSelecionado) {
        if (enderecoContatoSelecionando) {
          this.updateEndereco(enderecoContatoSelecionando);
        } else if ((this.uf || this.cidade || this.estado || this.logradouro || this.cep || this.bairro || this.numero) && (enderecoContatoSelecionando === undefined)) {
          this.adicionarEndereco(contatoSelecionado);
        }
        if (funcionarioSelecionado) {
          this.updateFuncionario(funcionarioSelecionado);
        } else if (this.box_fun === true) {
          const setorRamalEncontrado = this.setor_ramais.find(setorRamal =>
            setorRamal.id_setor === this.setor && setorRamal.id_ramal_setor === this.nramal
          );
          if (setorRamalEncontrado !== undefined) {
            this.adicionarFuncionario(contatoSelecionado, setorRamalEncontrado);
          }
        }
        if (contato !== undefined) {
          this.update(contato);
          this.resposta = `Contato salvo com sucesso!`;
        }
      } else {
        this.adicionarContato();
        this.clear();
        this.resposta = `Contato salvo com sucesso!`;
      }
    } else {
      alert("Erro ao salvar o contato, verifique as validações!")
      this.resposta = 'Erro ao salvar o contato!'
    }
  } adicionarContato() {
    const setorRamalEncontrado = this.setor_ramais.find(setorRamal =>
      setorRamal.id_setor === this.setor && setorRamal.id_ramal_setor === this.nramal
    );
    this.novoContato.nome_pessoa = this.nome_pessoa;
    this.novoContato.email = this.email;
    this.novoContato.celular1 = this.removerCaracteresEspeciais(this.celular1);
    this.novoContato.celular2 = this.removerCaracteresEspeciais(this.celular2);
    this.novoContato.celular3 = this.removerCaracteresEspeciais(this.celular3);
    this.novoContato.telefone = this.removerCaracteresEspeciais(this.telefone);
    this.novoContato.flag_privado = this.boxPrivate;
    this.novoContato.flag_funcionario = this.box_fun;

    this.http.post<Contato>(`${this.url}/pessoa`, this.novoContato)
      .subscribe(novoContato => {
        this.contatos.push(novoContato);
        const id = novoContato.id_pessoa;

        if ((this.logradouro || this.numero || this.estado || this.cidade || this.bairro || this.uf || this.cep)) {
          console.log(this.box_fun)
          this.adicionarEndereco(id);
        }

        if (this.box_fun === true && setorRamalEncontrado !== undefined) {
          this.adicionarFuncionario(id, setorRamalEncontrado);
        }
        alert('Contato adicionado com sucesso!');
      }, error => {
        console.error('Erro ao adicionar contato:', error);
        alert('Erro ao adicionar contato!');

      })

  } adicionarEndereco(id_contato: string) {
    this.novoEndereco.id_pessoa = id_contato;
    this.novoEndereco.logradouro = this.logradouro;
    this.novoEndereco.numero = this.numero;
    this.novoEndereco.estado = this.estado;
    this.novoEndereco.cidade = this.cidade;
    this.novoEndereco.bairro = this.bairro;
    this.novoEndereco.uf = this.uf;
    this.novoEndereco.cep = this.removerCaracteresEspeciais(this.cep);
    this.http.post<Endereco>(`${this.url}/endereco`, this.novoEndereco)
      .subscribe(novoEndereco => {
        this.enderecos.push(novoEndereco);
      }, error => {
        console.error('Erro ao adicionar endereco:', error);
      })
  } adicionarFuncionario(id_contato: string, setorRamalEncontrado: SetorRamal) {
    this.novoFuncionario.id_pessoa = id_contato;
    this.novoFuncionario.data_nascimento = this.data_nascimento;
    // console.log(this.foto)
    // Construir um objeto FormData
    // const formData = new FormData();
    // formData.append('funcionarioDtos', JSON.stringify(this.novoFuncionario));
    // if (this.foto !== null) {
    //   formData.append('foto', this.foto);
    //   console.log(this.foto)
    // } else {
    //   console.error('A imagem não está definida.');
    // }
    if (setorRamalEncontrado) {
      this.novoFuncionario.id_setor_ramal = setorRamalEncontrado.id_setor_ramal;
      this.http.post<Funcionario>(`${this.url}/funcionario`, this.novoFuncionario)
        .subscribe(
          novoFuncionario => {
            this.funcionarios.push(novoFuncionario);
          },
          error => {
            console.error('Erro ao adicionar funcionario:', error);
          }
        );
    }
  } getInformacoes() {
    const id_contato = this.id_rota;
    const informacoesContato = this.contatos.find(pessoa => pessoa.id_pessoa === id_contato);
    if (informacoesContato !== undefined) {
      this.nome_pessoa = informacoesContato.nome_pessoa;
      this.email = informacoesContato.email;
      this.celular1 = informacoesContato.celular1;
      this.celular2 = informacoesContato.celular2;
      this.celular3 = informacoesContato.celular3;
      this.telefone = informacoesContato.telefone;
      this.box_fun = informacoesContato.flag_funcionario;
      this.boxPrivate = informacoesContato.flag_privado;
    }
    // Dados do endereco da pessoa
    const endereco = this.enderecos.find(endereco => endereco.id_pessoa === id_contato);
    if (endereco !== undefined) {
      this.logradouro = endereco.logradouro;
      this.bairro = endereco.bairro;
      this.cidade = endereco.cidade;
      this.estado = endereco.estado;
      this.numero = endereco.numero;
      this.uf = endereco.uf;
      this.cep = endereco.cep;
    }
    // Dados do funcionario
    const funcionario = this.funcionarios.find(funcionario => funcionario.id_pessoa === id_contato)
    if (funcionario !== undefined) {
      const setor_ramal = this.setor_ramais.find(setor_ramal => setor_ramal.id_setor_ramal === funcionario.id_setor_ramal);
      if (setor_ramal !== undefined) {
        const setor = this.setores.find(setor => setor_ramal.id_setor === setor.id_setor);
        if (setor !== undefined) {
          this.getRamaisPorSetor(setor?.id_setor);
          const ramal = this.ramaisFiltrados.find(ramal => ramal.id_ramal_setor === setor_ramal.id_ramal_setor);
          if (setor !== undefined) {
            this.data_nascimento = funcionario.data_nascimento;
            this.setor = setor.id_setor ?? 'op';
            this.nramal = ramal?.id_ramal_setor ?? 'op2';
            console.log(this.nramal)
          } else {
            console.log("Setor nao encontrado")
          }
        }
      }
    }

  } update(contatoSelecionado: Contato) {
    this.updateContato(contatoSelecionado);
  } updateContato(contatoSelecionado: Contato) {
    this.contatoSelecionado = contatoSelecionado;
    if (!this.contatoSelecionado) return;
    this.contatoSelecionado.nome_pessoa = this.nome_pessoa;
    this.contatoSelecionado.celular1 = this.removerCaracteresEspeciais(this.celular1);
    this.contatoSelecionado.celular2 = this.removerCaracteresEspeciais(this.celular2);
    this.contatoSelecionado.celular3 = this.removerCaracteresEspeciais(this.celular3);
    this.contatoSelecionado.email = this.email;
    this.contatoSelecionado.telefone = this.removerCaracteresEspeciais(this.telefone);
    this.contatoSelecionado.flag_funcionario = this.box_fun;
    this.contatoSelecionado.flag_privado = this.boxPrivate;

    this.http.put<Contato>(`${this.url}/pessoa/${this.contatoSelecionado.id_pessoa}`, this.contatoSelecionado)
      .subscribe(
        () => {
          alert('Contato atualizado com sucesso!');
          this.contatoSelecionado = null;
        },
        error => {
          console.error('Erro ao atualizar contato:', error);
          alert('Erro ao atualizar contato!');
        }
      );
  } updateEndereco(enderecoSelecionado: Endereco) {
    this.enderecoSelecionado = enderecoSelecionado;
    if (!this.enderecoSelecionado) return;
    this.enderecoSelecionado.logradouro = this.logradouro;
    this.enderecoSelecionado.bairro = this.bairro;
    this.enderecoSelecionado.numero = this.numero;
    this.enderecoSelecionado.estado = this.estado;
    this.enderecoSelecionado.uf = this.uf;
    this.enderecoSelecionado.cidade = this.cidade;
    this.enderecoSelecionado.cep = this.removerCaracteresEspeciais(this.cep);

    this.http.put<Endereco>(`${this.url}/endereco/${this.enderecoSelecionado.id_endereco}`, this.enderecoSelecionado)
      .subscribe(
        () => {
          this.enderecoSelecionado = null;
          console.log('Updade Endereco.')
        },
        error => {
          console.error('Erro ao atualizar endereco:', error);
        }
      );
  } updateFuncionario(funcionarioSelecionado: Funcionario) {
    this.funcionarioSelecionado = funcionarioSelecionado;
    if (!this.funcionarioSelecionado) return;
    this.funcionarioSelecionado.data_nascimento = this.data_nascimento;

    const setorRamalEncontrado = this.setor_ramais.find(setorRamal =>
      setorRamal.id_setor === this.setor && setorRamal.id_ramal_setor === this.nramal
    );

    if (setorRamalEncontrado) {
      this.funcionarioSelecionado.id_setor_ramal = setorRamalEncontrado.id_setor_ramal;
    }
    this.http.put<Funcionario>(`${this.url}/funcionario/${this.funcionarioSelecionado.id_funcionario}`, this.funcionarioSelecionado)
      .subscribe(
        () => {
          this.contatoSelecionado = null;
        },
        error => {
          console.error('Erro ao atualizar funcionario:', error);
        }
      );
  }
}
