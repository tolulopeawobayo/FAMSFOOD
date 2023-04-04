import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateFoodItemsComponent } from './create-update-food-items.component';

describe('CreateUpdateFoodItemsComponent', () => {
  let component: CreateUpdateFoodItemsComponent;
  let fixture: ComponentFixture<CreateUpdateFoodItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateFoodItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateFoodItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
