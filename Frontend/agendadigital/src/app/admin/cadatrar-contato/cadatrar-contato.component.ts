import { Component, Inject } from '@angular/core';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { DOCUMENT, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RamaisComponent } from '../ramais/ramais.component';
import { Setor } from '../../models/setor';
import { SetorRamal } from '../../models/setor-ramal';
import { Contato } from '../../models/contato';
import { Endereco } from '../../models/endereco';
import { Funcionario } from '../../models/funcionario';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

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
  setor: string = '';
  nramal: string = '';

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
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
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
    const checkboxPrivate = document.getElementById('boxPrivate') as HTMLInputElement;
    checkboxPrivate.addEventListener('change', (event) => {
      this.boxPrivate = checkboxPrivate.checked;
    });

  }

  estados() {
    // Função para popular as UF
    async function populateUFs() {
      const ufSelect = document.querySelector<HTMLSelectElement>("select[name=uf]") ?? document.createElement("select");
      const states = await (await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")).json();

      states.sort((a: any, b: any) => a.nome.localeCompare(b.nome));

      // Adicionando a opção "Selecione o Estado" como a primeira opção
      ufSelect.innerHTML = `<option value="">Selecione o Estado</option>`;

      // Adicionando as opções dos estados
      ufSelect.innerHTML += states.map((state: any) => `<option value="${state.id}">${state.nome}</option>`).join("");
    }

    // Função para obter as cidades
    async function getCities(event: Event) {
      const target = event.target as HTMLSelectElement;
      const ufValue = target.value;
      const stateInput = document.querySelector<HTMLInputElement>("input[name=state]") ?? document.createElement("input");
      const citySelect = document.querySelector<HTMLSelectElement>("select[name=city]") ?? document.createElement("select");

      const indexOfSelectedState = target.selectedIndex;
      const selectedOption = target.options[indexOfSelectedState];
      const stateName = selectedOption ? selectedOption['text'] : ""; // Acessando a propriedade 'text' corretamente

      stateInput.value = stateName;

      const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
      const cities = await (await fetch(url)).json();

      // Limpa o conteúdo atual do select de cidades
      citySelect.innerHTML = "";

      // Adiciona a opção "Selecione a Cidade" como a primeira opção
      citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`;

      // Adiciona as opções das cidades
      citySelect.innerHTML += cities.map((city: any) => `<option value="${city.nome}">${city.nome}</option>`).join("");
      citySelect.disabled = false;
    }


    // Adicionando evento de mudança para as UF
    document.querySelector("select[name=uf]")?.addEventListener("change", getCities);
    // Adicionando evento de clique para os itens de coleta
    document.querySelectorAll(".items-grid li").forEach(item => item.addEventListener("click", handleSelectedItem));

    // Função para lidar com a seleção de itens
    function handleSelectedItem(event: Event) {
      const itemLi = event.target as HTMLLIElement;
      itemLi.classList.toggle("selected");

      const itemId = Number(itemLi.dataset['id']); // Corrigindo acesso ao data-id
      const selectedItems = document.querySelector<HTMLInputElement>("input[name=items]");

      if (selectedItems) {
        const items = new Set(selectedItems.value.split(",").map(Number));
        items.has(itemId) ? items.delete(itemId) : items.add(itemId);
        selectedItems.value = Array.from(items).join(",");
      }
    }

    // Populando as UF
    populateUFs();

  }
  adicionarContato() {
    this.novoContato.nome_pessoa = this.nome_pessoa;
    this.novoContato.email = this.email;
    this.novoContato.celular1 = this.celular1;
    this.novoContato.celular2 = this.celular2;
    this.novoContato.telefone = this.telefone;
    this.novoContato.flag_privado = this.boxPrivate;
    this.novoContato.flag_funcionario = this.box_fun;
    // Verificar se o nome do usuário já existe localmente

    /*const nomeExistente = this.users.find(usuario =>
      usuario.nome.trim().toLowerCase() === this.novoUsuario.nome.trim().toLowerCase()
    );

    if (nomeExistente) {
      alert('O nome de usuário já está sendo utilizado.');
      return; // Parar a execução da função se o nome já existir localmente
    }

    // Verificar se o nome de usuário já existe localmente
    const usuarioExistente = this.users.find(usuario =>
      usuario.usuario.trim().toLowerCase() === this.novoUsuario.usuario.trim().toLowerCase()
    );

    if (usuarioExistente) {
      alert('O nome de usuário já está cadastrado.');
      return; // Parar a execução da função se o usuário já existir localmente
    }*/
    console.log('Logradouro', this.logradouro)
    this.http.post<Contato>(`${this.url}/pessoa`, this.novoContato)
      .subscribe(novoContato => {
        this.contatos.push(novoContato);
        console.log('Logradouro', this.logradouro)
        if ((this.logradouro || this.numero || this.estado || this.cidade || this.bairro || this.uf || this.cep) === null) {
          console.log(this.logradouro)
          this.adicionarEndereco(novoContato.id_pessoa);
        }


        if (this.box_fun === true) {
          this.adicionarFuncionario(novoContato.id_pessoa);
        }
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
      }, error => {
        console.error('Erro ao adicionar endereco:', error);
      })
  }
  adicionarFuncionario(id_contato: string) {
    this.novoFuncionario.id_pessoa = id_contato;
    this.novoFuncionario.data_nascimento = this.data_nascimento;

    const setorRamalEncontrado = this.setor_ramais.find(setorRamal =>
      setorRamal.id_setor === this.setor && setorRamal.id_ramal_setor === this.nramal
    );

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
    } else {
      console.error('Setor ou ramal não encontrados.');
    }
  }

}