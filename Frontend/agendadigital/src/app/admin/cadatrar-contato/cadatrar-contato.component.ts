import { Component } from '@angular/core';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";

@Component({
  selector: 'app-cadatrar-contato',
  standalone: true,
  templateUrl: './cadatrar-contato.component.html',
  styleUrl: './cadatrar-contato.component.css',
  imports: [NavAdminComponent]
})
export class CadatrarContatoComponent {
  ngOnInit() {
    this.checkbox();
    this.estados();

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

}