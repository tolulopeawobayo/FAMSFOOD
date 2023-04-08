import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMealOrderComponent } from './create-update-meal-order.component';

describe('CreateUpdateMealOrderComponent', () => {
  let component: CreateUpdateMealOrderComponent;
  let fixture: ComponentFixture<CreateUpdateMealOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateMealOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateMealOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
