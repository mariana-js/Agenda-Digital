import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamaisComponent } from './ramais.component';

describe('RamaisComponent', () => {
  let component: RamaisComponent;
  let fixture: ComponentFixture<RamaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RamaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RamaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
