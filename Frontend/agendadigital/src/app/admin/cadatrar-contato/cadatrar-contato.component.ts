import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Contato } from '../../models/contato';
import { Endereco } from '../../models/endereco';
import { Funcionario } from '../../models/funcionario';
import { Setor } from '../../models/setor';
import { SetorRamal } from '../../models/setor-ramal';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { RamaisComponent } from '../ramais/ramais.component';

@Component({
  selector: 'app-cadatrar-contato',
  standalone: true,
  templateUrl: './cadatrar-contato.component.html',
  styleUrl: './cadatrar-contato.component.css',
  imports: [NavAdminComponent, NgFor, HttpClientModule, FormsModule, RamaisComponent]
})
export class CadatrarContatoComponent {

  readonly url: string;
  contatos: Contato[] = [];
  enderecos: Endereco[] = [];
  funcionarios: Funcionario[] = [];

  setor_ramais: SetorRamal[] = [];
  setores: Setor[] = [];

  setorSelecionado: Setor | null = null;
  ramalSelecionado: SetorRamal | null = null;
  ramaisFiltrados: SetorRamal[] = [];

  //Contato
  nome_pessoa: string = '';
  email: string = '';
  celular1: string = '';
  celular2: string = '';
  telefone: string = '';
  boxPrivate: boolean = false;
  box_fun: boolean = false;

  novoContato: Contato = {
    id_pessoa: '',
    nome_pessoa: this.nome_pessoa,
    email: this.email,
    celular1: this.celular1,
    celular2: this.celular2,
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

  novoFuncionario: Funcionario = {
    id_funcionario: '',
    id_setor_ramal: this.id_setor_ramal,
    id_pessoa: this.id_contato,
    nome: '',
    setor: '',
    data_nascimento: this.data_nascimento,
    dia: '',
    mes: ''
  }
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';

  }

  ngOnInit() {
    this.checkbox();
    this.estados();
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
    });
    console.log(this.cidade, this.estado, this.uf)
  }
  getSetores() {
    this.http.get<Setor[]>(`${this.url}/setor`)
      .subscribe(resultados => {
        this.setores = resultados;
        this.setores.sort((a, b) => a.nome_setor.localeCompare(b.nome_setor));
      });
  }
  selecionarSetor(event: Event) {
    const idSetor = (event.target as HTMLSelectElement).value;
    this.getRamaisPorSetor(idSetor);
    this.setor = idSetor;
  }

  selecionarRamal(event: Event) {
    const nramal = (event.target as HTMLSelectElement).value;
    this.nramal = nramal;
  }
  getRamaisPorSetor(idSetor: string) {
    // Filtrar a lista de setor_ramais pelo id_setor selecionado
    this.ramaisFiltrados = this.setor_ramais.filter(ramal => ramal.id_setor === idSetor);
  }
  getSetorRamal() {
    this.http.get<SetorRamal[]>(`${this.url}/setor_ramal`)
      .subscribe(resultados => {
        this.setor_ramais = resultados;
      })
  }
  checkbox() {
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
  }

  estados() {
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
  }
  adicionarContato() {
    // Verificar se algum dos campos obrigatórios está vazio
    if (!this.nome_pessoa || !this.email || !this.celular1) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    this.novoContato.nome_pessoa = this.nome_pessoa;
    this.novoContato.email = this.email;
    this.novoContato.celular1 = this.celular1;
    this.novoContato.celular2 = this.celular2;
    this.novoContato.telefone = this.telefone;
    this.novoContato.flag_privado = this.boxPrivate;
    this.novoContato.flag_funcionario = this.box_fun;

    // Verificar se o nome do contato já existe localmente
    const nomeExistente = this.contatos.find(pessoa =>
      pessoa.nome_pessoa.trim().toLowerCase() === this.novoContato.nome_pessoa.trim().toLowerCase()
    );

    if (nomeExistente) {
      alert('Este nome já está em uso, favor alterar!');
      return;
    }

    // Verificar se o email já existe localmente
    const emailExistente = this.contatos.find(pessoa =>
      pessoa.email.trim().toLowerCase() === this.novoContato.email.trim().toLowerCase()
    );

    if (emailExistente) {
      alert('Este email já está em uso, favor alterar!');
      return;
    }

    // Verificar se o celular 1 já existe localmente
    const celular1Existente = this.contatos.find(pessoa =>
      pessoa.celular1.trim().toLowerCase() === this.novoContato.celular1.trim().toLowerCase()
    );

    if (celular1Existente) {
      alert('Celular 1 já está em uso, favor alterar!');
      return;
    }

    this.http.post<Contato>(`${this.url}/pessoa`, this.novoContato)
      .subscribe(novoContato => {
        this.contatos.push(novoContato);
        const id = novoContato.id_pessoa;

        if ((this.logradouro && this.numero && this.estado && this.cidade && this.bairro && this.uf && this.cep)) {
          this.adicionarEndereco(id);
        }
        if (this.box_fun === true) {
          this.adicionarFuncionario(id);
        }

        this.nome_pessoa = '';
        this.email = '';
        this.celular1 = '';
        this.celular2 = '';
        this.telefone = '';
        this.boxPrivate = false;
        this.box_fun = false;

        alert('Contato adicionado com sucesso!');

      }, error => {
        console.error('Erro ao adicionar contato:', error);
        alert('Erro ao adicionar contato!');

      })

  }
  adicionarEndereco(id_contato: string) {
    this.novoEndereco.id_pessoa = id_contato;
    this.novoEndereco.logradouro = this.logradouro;
    this.novoEndereco.numero = this.numero;
    this.novoEndereco.estado = this.estado;
    this.novoEndereco.cidade = this.cidade;
    this.novoEndereco.bairro = this.bairro;
    this.novoEndereco.uf = this.uf;
    this.novoEndereco.cep = this.cep;

    this.http.post<Endereco>(`${this.url}/endereco`, this.novoEndereco)
      .subscribe(novoEndereco => {
        this.enderecos.push(novoEndereco);

        this.logradouro = '';
        this.numero = '';
        this.estado = 'estado';
        this.cidade = '';
        this.bairro = '';
        this.uf = '';
        this.cep = '';
      }, error => {
        console.error('Erro ao adicionar endereco:', error);
      })
  }
  adicionarFuncionario(id_contato: string) {
    const setorRamalEncontrado = this.setor_ramais.find(setorRamal =>
      setorRamal.id_setor === this.setor && setorRamal.id_ramal_setor === this.nramal
    );

    // Verificar se algum dos campos obrigatórios está vazio
    if (!this.data_nascimento || !setorRamalEncontrado) {
      alert('Por favor, preencha todos os campos obrigatórios do funcionário!');
      return;
    }
    this.novoFuncionario.id_pessoa = id_contato;
    this.novoFuncionario.data_nascimento = this.data_nascimento;

    if (setorRamalEncontrado) {
      this.novoFuncionario.id_setor_ramal = setorRamalEncontrado.id_setor_ramal;

      this.http.post<Funcionario>(`${this.url}/funcionario`, this.novoFuncionario)
        .subscribe(
          novoFuncionario => {
            this.funcionarios.push(novoFuncionario);
            this.nramal = 'op2';
            this.setor = 'op';
            this.data_nascimento = '';

          },
          error => {
            console.error('Erro ao adicionar funcionario:', error);

          }
        );
    } else {
      console.error('Setor ou ramal não encontrados.');
    }
  }

}
