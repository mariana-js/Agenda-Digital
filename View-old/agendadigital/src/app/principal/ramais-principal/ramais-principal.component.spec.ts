import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamaisPrincipalComponent } from './ramais-principal.component';

describe('RamaisPrincipalComponent', () => {
  let component: RamaisPrincipalComponent;
  let fixture: ComponentFixture<RamaisPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RamaisPrincipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RamaisPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
