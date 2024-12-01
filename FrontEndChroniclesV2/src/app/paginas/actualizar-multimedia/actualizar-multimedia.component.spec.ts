import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMultimediaComponent } from './actualizar-multimedia.component';

describe('ActualizarMultimediaComponent', () => {
  let component: ActualizarMultimediaComponent;
  let fixture: ComponentFixture<ActualizarMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarMultimediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
