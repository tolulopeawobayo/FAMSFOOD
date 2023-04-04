import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminUsersComponent } from './update-admin-users.component';

describe('UpdateAdminUsersComponent', () => {
  let component: UpdateAdminUsersComponent;
  let fixture: ComponentFixture<UpdateAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdminUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
