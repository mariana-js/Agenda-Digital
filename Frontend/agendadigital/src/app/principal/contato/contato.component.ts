import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Contato } from '../../models/contato';
import { Endereco } from '../../models/endereco';
import { Funcionario } from '../../models/funcionario';
import { Setor } from '../../models/setor';
import { SetorRamal } from '../../models/setor-ramal';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [NgFor, HttpClientModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  readonly url: string;
  contato: Contato[] = [];
  funcionario: Funcionario[] = [];
  setor_ramais: SetorRamal[] = [];
  setores: Setor[] = [];
  endereco: Endereco[] = [];

  id_contato = '32500971-b49f-427b-a3b6-ed9136212a53';
  id_funcionario = '';

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  ngOnInit() {
    forkJoin({
      contato: this.http.get<Contato[]>(`${this.url}/pessoa`),
      funcionario: this.http.get<Funcionario[]>(`${this.url}/funcionario/all`),
      setor_ramais: this.http.get<SetorRamal[]>(`${this.url}/setor_ramal`),
      setores: this.http.get<Setor[]>(`${this.url}/setor`),
      endereco: this.http.get<Endereco[]>(`${this.url}/endereco`)

    }).subscribe(({ contato, funcionario, setor_ramais, setores, endereco }) => {
      this.contato = contato;
      this.funcionario = funcionario;
      this.setor_ramais = setor_ramais;
      this.setores = setores;
      this.endereco = endereco;
      this.getInformacoes(); // Chamada para obter informações depois de carregar os dados
    });
  }

  getInformacoes() {

    //Dados da pesso
    const pessoa = this.contato.find(pessoa => pessoa.id_pessoa === this.id_contato)
    console.log('Informações do contato:', pessoa);

    //Dados do endereco da pessoa
    const endereco = this.endereco.find(endereco => endereco.id_pessoa === pessoa?.id_pessoa);
    if (endereco != undefined){
      console.log('Informações do endereço:', endereco);

    } else {
      console.log('Contato não possui endereço!')
    }

    //Dados do funcionario
    const funcionario = this.funcionario.find(funcionario => funcionario.id_funcionario === this.id_funcionario)

    if (funcionario != undefined) {

      const setor_ramal = this.setor_ramais.find(setor_ramal => setor_ramal.id_setor_ramal === funcionario?.id_setor_ramal)
      const setor = this.setores.find(setor => setor_ramal?.id_setor === setor.id_setor)

      console.log('Informações do funcionário:', funcionario);
      console.log('Nome do setor:', setor?.nome_setor);
      console.log('Sigla do setor:', setor?.sigla_setor);

    } else {
      console.log('Não é funcionario!')
    }


  }
}
