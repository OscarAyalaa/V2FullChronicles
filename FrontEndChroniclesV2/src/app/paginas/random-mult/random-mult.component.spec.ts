import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMultComponent } from './random-mult.component';

describe('RandomMultComponent', () => {
  let component: RandomMultComponent;
  let fixture: ComponentFixture<RandomMultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomMultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomMultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
