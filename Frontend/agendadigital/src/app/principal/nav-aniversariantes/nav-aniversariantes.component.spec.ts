import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAniversariantesComponent } from './nav-aniversariantes.component';

describe('NavAniversariantesComponent', () => {
  let component: NavAniversariantesComponent;
  let fixture: ComponentFixture<NavAniversariantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavAniversariantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavAniversariantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
