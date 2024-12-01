import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMultimediaComponent } from './detalles-multimedia.component';

describe('DetallesMultimediaComponent', () => {
  let component: DetallesMultimediaComponent;
  let fixture: ComponentFixture<DetallesMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesMultimediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
