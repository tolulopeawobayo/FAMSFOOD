import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMealScheduleComponent } from './create-update-meal-schedule.component';

describe('CreateUpdateMealScheduleComponent', () => {
  let component: CreateUpdateMealScheduleComponent;
  let fixture: ComponentFixture<CreateUpdateMealScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateMealScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateMealScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
