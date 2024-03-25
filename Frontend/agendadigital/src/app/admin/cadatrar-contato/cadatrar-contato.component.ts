import { Component } from '@angular/core';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RamaisComponent } from '../ramais/ramais.component';
import { Setor } from '../../models/setor';
import { SetorRamal } from '../../models/setor-ramal';
import { Contato } from '../../models/contato';

@Component({
  selector: 'app-cadatrar-contato',
  standalone: true,
  templateUrl: './cadatrar-contato.component.html',
  styleUrl: './cadatrar-contato.component.css',
  imports: [NavAdminComponent, NgFor, HttpClientModule, RamaisComponent]
})
export class CadatrarContatoComponent {

  readonly url: string;

  setor_ramais: SetorRamal[] = [];
  setores: Setor[] = [];

  setorSelecionado: Setor | null = null;
  ramaisFiltrados: SetorRamal[] = [];

  //Contato
  nome_pessoa: string = '';
  email: string = '';
  celular1: string = '';
  celular2: string = '';
  telefone: string = '';
  flag_privado: boolean = false;
  flag_funcionario: boolean = false;

  novoContato: Contato = {
    id_pessoa: '',
    nome_pessoa: this.nome_pessoa,
    email: this.email,
    celular1: this.celular1,
    celular2: this.celular2,
    telefone: this.telefone,
    flag_privado: this.flag_privado,
    flag_funcionario: this.flag_funcionario
  };

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';

  }

  ngOnInit() {
    this.checkbox();
    this.estados();
    this.getSetores();
    this.getSetorRamal();
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
    console.log('ID do setor selecionado:', idSetor);

    this.getRamaisPorSetor(idSetor);
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
    // this.novoUsuario.nome = this.nome;
    // this.novoUsuario.usuario = this.usuario;
    // this.novoUsuario.senha = this.senha;

    // // Verificar se o nome do usuário já existe localmente
    // const nomeExistente = this.users.find(usuario =>
    //   usuario.nome.trim().toLowerCase() === this.novoUsuario.nome.trim().toLowerCase()
    // );

    // if (nomeExistente) {
    //   alert('O nome de usuário já está sendo utilizado.');
    //   return; // Parar a execução da função se o nome já existir localmente
    // }

    // // Verificar se o nome de usuário já existe localmente
    // const usuarioExistente = this.users.find(usuario =>
    //   usuario.usuario.trim().toLowerCase() === this.novoUsuario.usuario.trim().toLowerCase()
    // );

    // if (usuarioExistente) {
    //   alert('O nome de usuário já está cadastrado.');
    //   return; // Parar a execução da função se o usuário já existir localmente
    // }
    // this.http.post<Usuario>(`${this.url}/usuario`, this.novoUsuario)
    //   .subscribe(novoUsuario => {
    //     this.users.push(novoUsuario);
    //     this.users.sort((a, b) => a.nome.localeCompare(b.nome));
    //     this.clear();

    //   }, error => {
    //     console.error('Erro ao adicionar usuario:', error);
    //   })
  }
  adicionarEndereco() {
    // this.novoUsuario.nome = this.nome;
    // this.novoUsuario.usuario = this.usuario;
    // this.novoUsuario.senha = this.senha;

    // // Verificar se o nome do usuário já existe localmente
    // const nomeExistente = this.users.find(usuario =>
    //   usuario.nome.trim().toLowerCase() === this.novoUsuario.nome.trim().toLowerCase()
    // );

    // if (nomeExistente) {
    //   alert('O nome de usuário já está sendo utilizado.');
    //   return; // Parar a execução da função se o nome já existir localmente
    // }

    // // Verificar se o nome de usuário já existe localmente
    // const usuarioExistente = this.users.find(usuario =>
    //   usuario.usuario.trim().toLowerCase() === this.novoUsuario.usuario.trim().toLowerCase()
    // );

    // if (usuarioExistente) {
    //   alert('O nome de usuário já está cadastrado.');
    //   return; // Parar a execução da função se o usuário já existir localmente
    // }
    // this.http.post<Usuario>(`${this.url}/usuario`, this.novoUsuario)
    //   .subscribe(novoUsuario => {
    //     this.users.push(novoUsuario);
    //     this.users.sort((a, b) => a.nome.localeCompare(b.nome));
    //     this.clear();

    //   }, error => {
    //     console.error('Erro ao adicionar usuario:', error);
    //   })
  }
  adicionarFuncionario() {
    // this.novoUsuario.nome = this.nome;
    // this.novoUsuario.usuario = this.usuario;
    // this.novoUsuario.senha = this.senha;

    // // Verificar se o nome do usuário já existe localmente
    // const nomeExistente = this.users.find(usuario =>
    //   usuario.nome.trim().toLowerCase() === this.novoUsuario.nome.trim().toLowerCase()
    // );

    // if (nomeExistente) {
    //   alert('O nome de usuário já está sendo utilizado.');
    //   return; // Parar a execução da função se o nome já existir localmente
    // }

    // // Verificar se o nome de usuário já existe localmente
    // const usuarioExistente = this.users.find(usuario =>
    //   usuario.usuario.trim().toLowerCase() === this.novoUsuario.usuario.trim().toLowerCase()
    // );

    // if (usuarioExistente) {
    //   alert('O nome de usuário já está cadastrado.');
    //   return; // Parar a execução da função se o usuário já existir localmente
    // }
    // this.http.post<Usuario>(`${this.url}/usuario`, this.novoUsuario)
    //   .subscribe(novoUsuario => {
    //     this.users.push(novoUsuario);
    //     this.users.sort((a, b) => a.nome.localeCompare(b.nome));
    //     this.clear();

    //   }, error => {
    //     console.error('Erro ao adicionar usuario:', error);
    //   })
  }

}

// selecionarUsuario(user: Usuario) {
//   this.userSelecionado = { ...user }
//   this.nome = user.nome;
//   this.usuario = user.usuario;
//   this.senha = user.senha;
// }

// excluirUsuario(user: Usuario) {
//   if (confirm('Tem certeza de que deseja excluir este usuário?')) {
//     this.http.delete(`${this.url}/usuario/${user.id_usuario}`)
//       .subscribe(
//         () => {
//           this.users = this.users.filter(s => s.id_usuario !== user.id_usuario);
//           this.getUsuarios();
//           alert('Usuário excluído com sucesso!');
//         },
//         error => {

//           this.getUsuarios();
//           console.error('Erro ao excluir usuario:', error);
//           alert('Erro ao excluir usuario!');
//         }
//       );
//   }
// }
