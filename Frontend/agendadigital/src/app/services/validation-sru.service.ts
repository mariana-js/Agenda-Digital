import { Injectable } from '@angular/core';
import { Ramal } from '../models/ramal';
import { Setor } from '../models/setor';
import { Usuario } from '../models/usuario';
import { RamalService } from './ramal.service';
import { SetorService } from './setor.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationSRUService {
  mensagem: string[] = [];
  resposta: string[] = [];

  setores: Setor[] = [];
  usuarios: Usuario[] = [];
  ramais: Ramal[] = [];

  constructor(
    private readonly setorService: SetorService,
    private readonly ramalService: RamalService,
    private readonly usuarioService: UsuarioService
  ) { }


  async authSetor(nomesetor: string, sigla: string): Promise<string[]> {
    this.mensagem = [];
    if ((nomesetor || sigla) === '') this.mensagem.push('Campo(s) em branco!');
    if (sigla.length > 5) this.mensagem.push('Sigla muito grande!');
    if (nomesetor.length > 40) this.mensagem.push('Nome do setor muito grande!');
    else {
      this.setorService.getSetor().subscribe(r => {
        this.setores = r;

        if (this.setores.find(setor => setor.nome_setor === nomesetor)) this.mensagem.push('Nome do setor já cadastrado no sistema!');

        else if (this.setores.find(setor => setor.sigla_setor === sigla)) this.mensagem.push('Sigla já cadastrada no sistema!');
      }
      );
    }

    this.resposta = [...this.mensagem];
    return this.resposta;
  }

  async authUsuario(nome: string, usuario: string, senha: string): Promise<string[]> {
    this.mensagem = [];
    if ((nome || usuario || senha) === '') this.mensagem.push('Campo(s) em branco!');
    if (senha.length < 6) this.mensagem.push('A senha prescisa ter no mínimo 6 dígitos!');
    else {
      this.usuarioService.getUsuario().subscribe(r => {
        this.usuarios = r;

        if (this.usuarios.find(user => user.usuario === usuario)) this.mensagem.push('Nome do usuário já cadastrado no sistema!');
      }
      );
    }

    this.resposta = [...this.mensagem];
    return this.resposta;
  }

  async authRamal(numero_ramal: string, setor: string): Promise<string[]> {
    this.mensagem = [];
    if ((numero_ramal) === '') this.mensagem.push('Campo do número do ramal em branco!');
    if ((setor) === '') this.mensagem.push('Selecione o setor do ramal!');

    else {
      this.ramalService.getRamal().subscribe(r => {
        this.ramais = r;
        if (this.ramais.find(ramal => ramal.numero_ramal === numero_ramal)) this.mensagem.push('Número do ramal já cadastrado no sistema!');
      }
      );
    }

    this.resposta = [...this.mensagem];
    return this.resposta;
  }
}
