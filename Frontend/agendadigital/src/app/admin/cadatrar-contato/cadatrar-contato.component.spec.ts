import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadatrarContatoComponent } from './cadatrar-contato.component';

describe('CadatrarContatoComponent', () => {
  let component: CadatrarContatoComponent;
  let fixture: ComponentFixture<CadatrarContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadatrarContatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadatrarContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
