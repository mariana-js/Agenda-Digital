import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Setor } from '../../models/setor';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
@Component({
  selector: 'app-setores',
  standalone: true,
  templateUrl: './setores.component.html',
  styleUrl: './setores.component.css',
  imports: [NavAdminComponent, NgFor, HttpClientModule]
})
export class SetoresComponent {
  readonly url: string;
  setores: Setor[] = [];


  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }
  ngOnInit() {
    this.getSetores();
  }

  getSetores() {
    this.http.get<Setor[]>(`${this.url}/setor`)
      .subscribe(resultados => {
        this.setores = resultados;
      });
  }
}
