import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMultimediasComponent } from './lista-multimedias.component';

describe('ListaMultimediasComponent', () => {
  let component: ListaMultimediasComponent;
  let fixture: ComponentFixture<ListaMultimediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMultimediasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMultimediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
