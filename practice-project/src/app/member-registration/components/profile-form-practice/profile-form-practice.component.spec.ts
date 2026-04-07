import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormPracticeComponent } from './profile-form-practice.component';

describe('ProfileFormPracticeComponent', () => {
  let component: ProfileFormPracticeComponent;
  let fixture: ComponentFixture<ProfileFormPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFormPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFormPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
