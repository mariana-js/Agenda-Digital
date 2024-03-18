import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-nav-aniversariantes',
  standalone: true,
  templateUrl: './nav-aniversariantes.component.html',
  styleUrl: './nav-aniversariantes.component.css',
  imports: [NgFor, HttpClientModule]
})
export class NavAniversariantesComponent {
  readonly url: string;
  aniversariantes: Funcionario[] = [];


  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getAniversariantes();
  }


  getAniversariantes() {
    // Obtém a data atual
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; // Os meses em JavaScript começam do zero, então adicionamos 1 para obter o mês atual
    console.log('Data atual: '+mesAtual)
    // Faz a requisição para obter os funcionários com aniversários no mês atual
    this.http.get<Funcionario[]>(`${this.url}/funcionario?mes=${mesAtual}`)
      .subscribe(resultados => {
        // Limpa os aniversariantes existentes antes de adicionar os novos
        this.aniversariantes = [];

        // Itera sobre os resultados e extrai apenas o dia e o mês dos aniversariantes
        resultados.forEach(funcionario => {
          // Cria um novo objeto Funcionario apenas com as propriedades dia, mes e data_nascimento
          const aniversariante: Funcionario = {
            id_setor_ramal: funcionario.id_setor_ramal,
            id_pessoa: funcionario.id_pessoa,
            data_nascimento:funcionario.data_nascimento, // Cria uma string com a data de nascimento no formato "MM/DD"
            dia: funcionario.dia,
            mes: funcionario.mes,
            nome: funcionario.nome,
            setor: 'Juridico'
          };

          this.aniversariantes.push(aniversariante);

            console.log('Nome e setores: '+ aniversariante.nome,aniversariante.setor)

        });
      });
  }
}
