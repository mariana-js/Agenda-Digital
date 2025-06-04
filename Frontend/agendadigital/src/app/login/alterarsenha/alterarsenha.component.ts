import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-alterarsenha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alterarsenha.component.html',
  styleUrl: './alterarsenha.component.css'
})
export class AlterarsenhaComponent {
  usuario: string | undefined;
  senhaAtual: string | undefined;
  senha1: string = '';
  senha2: string = '';
  acesso: Usuario[] = [];

  constructor(
    private readonly router: Router,
    private readonly usuarioService: UsuarioService
  ) {

  } ngOnInit() {
    forkJoin({
      acesso: this.usuarioService.getUsuario(),
    }).subscribe(({ acesso }) => {
      this.acesso = acesso;
    });
  } alterar() {
    this.router.navigate(['/login']);
  }

}
