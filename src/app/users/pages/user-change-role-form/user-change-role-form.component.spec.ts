import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangeRoleFormComponent } from './user-change-role-form.component';

describe('UserChangeRoleFormComponent', () => {
  let component: UserChangeRoleFormComponent;
  let fixture: ComponentFixture<UserChangeRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChangeRoleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangeRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
