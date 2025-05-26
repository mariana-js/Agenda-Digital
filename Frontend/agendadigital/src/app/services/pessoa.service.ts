import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

//   url = 'http://localhost:8080';
//   constructor(private http: HttpClient) {

//   }

//    getInformacoes() {
//     const id_contato = this.id_rota;
//     // Dados da pessoa
//     const informacoesContato = this.contato.find(pessoa => pessoa.id_pessoa === id_contato);
//     if (informacoesContato !== undefined) {
//       this.nome = informacoesContato.nome_pessoa;
//       this.email = informacoesContato.email;
//       this.celular1 = informacoesContato.celular1;
//       this.celular2 = informacoesContato.celular2;
//       this.celular3 = informacoesContato.celular3;
//       this.telefone = informacoesContato.telefone;
//     }

//     // Dados do endereco da pessoa
//     const endereco = this.endereco.find(endereco => endereco.id_pessoa === id_contato);
//     if (endereco !== undefined) {
//       this.logradouro = endereco.logradouro;
//       this.bairro = endereco.bairro;
//       this.cidade = endereco.cidade;
//       this.estado = `${endereco.estado} -`;
//       this.uf = endereco.uf;
//       this.cep = endereco.cep;
//     }

//     // Dados do funcionario
//     const funcionario = this.funcionario.find(funcionario => funcionario.id_pessoa === id_contato)
//     if (funcionario !== undefined) {
//       const setor_ramal = this.setor_ramais.find(setor_ramal => setor_ramal.id_setor_ramal === funcionario?.id_setor_ramal)
//       const setor = this.setores.find(setor => setor_ramal?.id_setor === setor.id_setor)
//       this.nome_setor = `${setor?.nome_setor} -`;
//       this.sigla = setor?.sigla_setor;
//       this.ramal = `Ramal: ${setor_ramal?.id_ramal_setor}`;
//     }

// 

}
