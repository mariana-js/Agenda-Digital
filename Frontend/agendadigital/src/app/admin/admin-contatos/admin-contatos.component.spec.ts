import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContatosComponent } from './admin-contatos.component';

describe('AdminContatosComponent', () => {
  let component: AdminContatosComponent;
  let fixture: ComponentFixture<AdminContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
