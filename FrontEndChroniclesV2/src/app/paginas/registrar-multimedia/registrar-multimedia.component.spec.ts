import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMultimediaComponent } from './registrar-multimedia.component';

describe('RegistrarMultimediaComponent', () => {
  let component: RegistrarMultimediaComponent;
  let fixture: ComponentFixture<RegistrarMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarMultimediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
