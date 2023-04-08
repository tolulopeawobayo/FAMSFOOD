import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateAccountsComponent } from './create-update-accounts.component';

describe('CreateUpdateAccountsComponent', () => {
  let component: CreateUpdateAccountsComponent;
  let fixture: ComponentFixture<CreateUpdateAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
