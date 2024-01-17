import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadatrarPessoaComponent } from './cadatrar-pessoa.component';

describe('CadatrarPessoaComponent', () => {
  let component: CadatrarPessoaComponent;
  let fixture: ComponentFixture<CadatrarPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadatrarPessoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadatrarPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
