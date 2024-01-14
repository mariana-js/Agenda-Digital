import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {

  // qtddeContatos: number = 200;
  // pessoa: any; implements OnInit

  // constructor(
  //   private pessoaService: PessoaService
  // ) { }

  // ngOnInit() {
  //   this.pessoa.getPessoas().subscribe(
  //     (data:any) => {
  //       this.pessoa = data['pessoa'];

  //     },
  //     (error:any) => {
  //       console.log(error);
  //     })
  // }

}
