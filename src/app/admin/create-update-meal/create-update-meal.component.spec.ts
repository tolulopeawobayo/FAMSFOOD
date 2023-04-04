import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMealComponent } from './create-update-meal.component';

describe('CreateUpdateMealComponent', () => {
  let component: CreateUpdateMealComponent;
  let fixture: ComponentFixture<CreateUpdateMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateMealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
