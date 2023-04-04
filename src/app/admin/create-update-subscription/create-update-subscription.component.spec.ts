import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSubscriptionComponent } from './create-update-subscription.component';

describe('CreateUpdateSubscriptionComponent', () => {
  let component: CreateUpdateSubscriptionComponent;
  let fixture: ComponentFixture<CreateUpdateSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
