import { Injectable } from '@angular/core';
import { Ramal } from '../models/ramal';
import { Setor } from '../models/setor';
import { Usuario } from '../models/usuario';
import { RamalService } from './ramal.service';
import { SetorService } from './setor.service';
import { UsuarioService } from './usuario.service';
import { firstValueFrom } from 'rxjs';

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


  async authSetor(nomesetor: string, sigla: string, add: 'adicionar' | 'atualizar', idAtual?: string): Promise<string[]> {
    this.mensagem = [];
    if (nomesetor.trim() === '' || sigla.trim() === '') this.mensagem.push('Campo(s) em branco!');
    if (sigla.length > 5) this.mensagem.push('Sigla muito grande!');
    if (nomesetor.length > 40) this.mensagem.push('Nome do setor muito grande!');
    if (this.mensagem.length > 0) return this.mensagem;
    try {
      this.setores = await firstValueFrom(this.setorService.getSetor());
      if (add === 'adicionar') {
        if (this.setores.find(setor => setor.nome_setor === nomesetor)) {
          this.mensagem.push('Nome do setor já cadastrado no sistema!');
        }

        if (this.setores.find(setor => setor.sigla_setor === sigla)) {
          this.mensagem.push('Sigla já cadastrada no sistema!');
        }

      } else if (add === 'atualizar' && idAtual) {
        if (this.setores.find(setor => setor.nome_setor === nomesetor && setor.id_setor !== idAtual)) {
          this.mensagem.push('Nome do setor já cadastrado por outro setor!');
        }

        if (this.setores.find(setor => setor.sigla_setor === sigla && setor.id_setor !== idAtual)) {
          this.mensagem.push('Sigla já cadastrada por outro setor!');
        }
      }
    } catch (error) {
      this.mensagem.push('Erro ao buscar setores!');
    }
    this.resposta = [...this.mensagem];
    return this.resposta;
  }

  async authUsuario(nome: string, usuario: string, senha: string, add: 'adicionar' | 'atualizar', idAtual?: string): Promise<string[]> {
    this.mensagem = [];
    if ((nome.trim() === '' || usuario.trim() === '' || senha.trim() === '')) this.mensagem.push('Campo(s) em branco!');
    if (senha.length < 6) this.mensagem.push('A senha prescisa ter no mínimo 6 dígitos!');
    if (this.mensagem.length > 0) return this.mensagem;

    try {
      this.usuarios = await firstValueFrom(this.usuarioService.getUsuario());

      if (add === 'adicionar') {
        if (this.usuarios.find(user => user.usuario === usuario)) this.mensagem.push('Nome do usuário já cadastrado no sistema!');

      } else if (add === 'atualizar' && idAtual) {
        if (this.usuarios.find(user => user.usuario === usuario && user.id_usuario !== idAtual)) this.mensagem.push('Nome do usuário já cadastrado por outro usuário!');

      }
    } catch (error) {
      this.mensagem.push('Erro ao buscar usuários!');
    }
    this.resposta = [...this.mensagem];
    return this.resposta;
  }

  async authRamal(numero_ramal: string, setor: string, add: 'adicionar' | 'atualizar', idAtual?: string): Promise<string[]> {
    this.mensagem = [];
    if ((numero_ramal) === '') this.mensagem.push('Campo número do ramal em branco!');
    if ((setor) === 'opcao1') this.mensagem.push('Selecione o setor do ramal!');
    if (this.mensagem.length > 0) return this.mensagem;

    if (add === null) {
      try {
        this.ramais = await firstValueFrom(this.ramalService.getRamal());

        if (add === 'adicionar') {
          if (this.ramais.find(ramal => ramal.numero_ramal === numero_ramal)) this.mensagem.push('Número do ramal já cadastrado no sistema!');

        } else if (add === 'atualizar' && idAtual) {
          if (this.ramais.find(ramal => ramal.numero_ramal === numero_ramal && ramal.numero_ramal !== idAtual)) this.mensagem.push('Número do ramal já cadastrado no sistema!');

        }
      } catch (error) {
        this.mensagem.push('Erro ao buscar usuários!');
      }
    }



    this.resposta = [...this.mensagem];
    return this.resposta;
  }
}
