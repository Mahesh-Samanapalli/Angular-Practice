import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-registration-form-practice',
  templateUrl: './event-registration-form-practice.component.html',
  styleUrls: ['./event-registration-form-practice.component.css']
})
export class EventRegistrationFormPracticeComponent {
  eventForm = new FormGroup({
    attendeeName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]),
    gender: new FormControl('', Validators.required),
    organization: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    ticketType: new FormControl('', Validators.required),
    mealPreference: new FormControl('', Validators.required),
    emergencyNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormGroup({
      venueCity: new FormControl('', Validators.required),
      travelFrom: new FormControl('', Validators.required),
      accommodationRequired: new FormControl('', Validators.required),
      zip: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')])
    }),
    interests: new FormArray([])
  });

  get interests(): FormArray {
    return this.eventForm.get('interests') as FormArray;
  }

  addInterest(value: string): void {
    const cleanedValue = value.trim();
    if (cleanedValue) {
      this.interests.push(new FormControl(cleanedValue, Validators.required));
    }
  }

  removeInterest(index: number): void {
    this.interests.removeAt(index);
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      console.log('Event Form Submitted', this.eventForm.value);
      return;
    }

    this.eventForm.markAllAsTouched();
  }
}
