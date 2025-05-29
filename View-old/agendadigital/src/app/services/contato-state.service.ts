import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';
@Injectable({
  providedIn: 'root',
})

export class ContatoStateService {
  private state: any;
  contatoSelecionado: Contato | null = null;

  constructor() {
  }
  clearContatoSelecionado() {
    this.contatoSelecionado = null;
  }
  saveState(state: any) {
    this.state = state;
  }
  getState(): any {
    return this.state;
  }
}
