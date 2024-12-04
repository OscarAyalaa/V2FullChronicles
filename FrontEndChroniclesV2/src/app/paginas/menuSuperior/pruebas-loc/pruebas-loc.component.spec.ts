import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasLocComponent } from './pruebas-loc.component';

describe('PruebasLocComponent', () => {
  let component: PruebasLocComponent;
  let fixture: ComponentFixture<PruebasLocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebasLocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebasLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
