import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfilledOrdersComponent } from './fulfilled-orders.component';

describe('FulfilledOrdersComponent', () => {
  let component: FulfilledOrdersComponent;
  let fixture: ComponentFixture<FulfilledOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulfilledOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulfilledOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
