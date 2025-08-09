import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MphMemberRegistrationComponent } from './mph-member-registration.component';

describe('MphMemberRegistrationComponent', () => {
  let component: MphMemberRegistrationComponent;
  let fixture: ComponentFixture<MphMemberRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MphMemberRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MphMemberRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
