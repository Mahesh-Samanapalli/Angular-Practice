import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interface for a single nominee
export interface Nominee {
  name: string;
  gender: 'male' | 'female' | 'other' | '';
  dateOfBirth: string; // Using string for date input
  relationship: 'spouse' | 'child' | 'parent' | 'other' | '';
  mobileNumber: string;
  email: string;
  percentage: number | null;
}

@Component({
  selector: 'app-template-driven-lab',
  templateUrl: './template-driven-lab.component.html',
  styleUrls: ['./template-driven-lab.component.css']
})
export class TemplateDrivenLabComponent {
  // Array to hold the nominee data
  nominees: Nominee[] = [];

  // Options for dropdowns
  genders = ['male', 'female', 'other'];
  relationships = ['spouse', 'child', 'parent', 'other'];

  // Inject MatSnackBar for notifications
  constructor(private snackBar: MatSnackBar) {}

  addNominee(): void {
    // 1. Check if the maximum number of nominees has been reached
    if (this.nominees.length >= 4) {
      this.snackBar.open('You can add a maximum of 4 nominees.', 'Close', { duration: 3000 });
      return;
    }

    // 2. Check if the total percentage exceeds 100
    const totalPercentage = this.nominees.reduce((acc, nominee) => acc + (nominee.percentage || 0), 0);
    if (totalPercentage >= 100) {
      this.snackBar.open('Total percentage cannot exceed 100%.', 'Close', { duration: 3000 });
      return;
    }

    // Add a new blank nominee
    this.nominees.push({
      name: '',
      gender: '',
      dateOfBirth: '',
      relationship: '',
      mobileNumber: '',
      email: '',
      percentage: null
    });
  }

  removeNominee(index: number): void {
    this.nominees.splice(index, 1);
  }

  // A method to check percentage in real-time as the user types
  validatePercentage(): void {
    const totalPercentage = this.nominees.reduce((acc, nominee) => acc + (nominee.percentage || 0), 0);
    if (totalPercentage > 100) {
      this.snackBar.open(`Total percentage has exceeded 100%. Current total is ${totalPercentage}%.`, 'Close', { duration: 4000 });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('The form is invalid. Please check the fields.', 'Close', { duration: 3000 });
      // Mark all fields as touched to display validation errors
      Object.keys(form.controls).forEach(field => {
        form.controls[field].markAsTouched();
      });
      return;
    }
    
    const totalPercentage = this.nominees.reduce((acc, nominee) => acc + (nominee.percentage || 0), 0);
    if (totalPercentage !== 100) {
        this.snackBar.open(`The total percentage must be exactly 100%. Current total is ${totalPercentage}%.`, 'Close', { duration: 4000 });
        return;
    }

    // eslint-disable-next-line no-console
    console.log('Form Submitted!', {
      formValue: form.value,
      model: this.nominees
    });
  }
}
