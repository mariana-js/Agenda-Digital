import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosHideComponent } from './contatos-hide.component';

describe('ContatosHideComponent', () => {
  let component: ContatosHideComponent;
  let fixture: ComponentFixture<ContatosHideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatosHideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContatosHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
