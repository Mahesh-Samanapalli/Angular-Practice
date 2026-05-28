import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-memberform-test',
  templateUrl: './memberform-test.component.html',
  styleUrls: ['./memberform-test.component.css'],
})
export class MemberformTestComponent implements OnInit {
  personalDetailsForm!: FormGroup;
  apiResponse = [{ firstName: 'John', lastName: 'Doe' },{ firstName: 'Jane', lastName: 'Smith' }];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializePersonalDetailsForm();
    this.addMember();
  }

  initializePersonalDetailsForm(): void {
    this.personalDetailsForm = this.fb.group({
      memberForm: this.fb.array([]),
    });
  }

  get memberFormArray(): FormArray {
    return this.personalDetailsForm.get('memberForm') as FormArray;
  }

  addMember(): void {
    this.memberFormArray.push(this.createMemberFormGroup());
  }

  createMemberFormGroup(): FormGroup {
    return this.fb.group({
      basicDetails: this.createBasicDetailsFormGroup(),
      nomineeDetails: this.createNomineeDetailsFormGroup(),
      communicationDetails: this.createCommunicationDetailsFormGroup(),
      addressDetails: this.createAddressDetailsFormGroup(),
    });
  }

  createBasicDetailsFormGroup(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailId: ['', [Validators.required, Validators.email]],
      occupation: ['', Validators.required],
      annualIncome: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  createNomineeDetailsFormGroup(): FormGroup {
    return this.fb.group({
      nomineeName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      nomineeRelation: ['', Validators.required],
      nomineeDateOfBirth: ['', Validators.required],
      nomineeMobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      nomineePercentage: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nomineeAddress: ['', Validators.required],
    });
  }

  createCommunicationDetailsFormGroup(): FormGroup {
    return this.fb.group({
      primaryEmail: ['', [Validators.required, Validators.email]],
      alternateEmail: ['', [Validators.email]],
      primaryMobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      alternateMobileNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      preferredCommunicationMethod: ['', Validators.required],
      languagePreference: ['', Validators.required],
    });
  }

  createAddressDetailsFormGroup(): FormGroup {
    return this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['India', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.personalDetailsForm.valid) {
      console.log('Form Submitted', this.personalDetailsForm.value);
      console.log('API Response', this.apiResponse);
    } else {
      console.log('Form is invalid');
    }
  }
}