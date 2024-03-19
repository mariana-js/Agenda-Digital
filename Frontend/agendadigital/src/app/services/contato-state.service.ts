import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoStateService {
  contatoSelecionado: Contato | null = null;

  constructor() { }
}
