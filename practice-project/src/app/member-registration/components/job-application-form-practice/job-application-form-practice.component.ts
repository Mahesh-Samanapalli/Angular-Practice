import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-application-form-practice',
  templateUrl: './job-application-form-practice.component.html',
  styleUrls: ['./job-application-form-practice.component.css']
})
export class JobApplicationFormPracticeComponent {
  jobForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    yearsOfExperience: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]),
    linkedInProfile: new FormControl('', Validators.required),
    currentCompany: new FormControl('', Validators.required),
    expectedCtc: new FormControl('', Validators.required),
    noticePeriodDays: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,3}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')])
    }),
    technologies: new FormArray([])
  });

  get technologies(): FormArray {
    return this.jobForm.get('technologies') as FormArray;
  }

  addTechnology(value: string): void {
    const cleanedValue = value.trim();
    if (cleanedValue) {
      this.technologies.push(new FormControl(cleanedValue, Validators.required));
    }
  }

  removeTechnology(index: number): void {
    this.technologies.removeAt(index);
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      console.log('Job Form Submitted', this.jobForm.value);
      return;
    }

    this.jobForm.markAllAsTouched();
  }
}
