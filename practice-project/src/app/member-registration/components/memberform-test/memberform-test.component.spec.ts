import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberformTestComponent } from './memberform-test.component';

describe('MemberformTestComponent', () => {
  let component: MemberformTestComponent;
  let fixture: ComponentFixture<MemberformTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberformTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberformTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
