import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-head',
  standalone: true,
  templateUrl: './head.component.html',
  styleUrl: './head.component.css',
  imports: [],
})

export class HeadComponent {
  constructor(private router: Router) { }

  navegarParaHome() {
    this.router.navigate(['/']);
  }

  navegarParaRamais() {
    this.router.navigate(['/ramal']);
  }
  
  navegarParaAdmin() {
    this.router.navigate(['/login']);
  }

  navegarParaSobre() {
    this.router.navigate(['/sobre']);
  }
}
