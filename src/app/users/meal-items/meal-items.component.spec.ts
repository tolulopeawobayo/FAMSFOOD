import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealItemsComponent } from './meal-items.component';

describe('MealItemsComponent', () => {
  let component: MealItemsComponent;
  let fixture: ComponentFixture<MealItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
