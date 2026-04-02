import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array-lab',
  templateUrl: './form-array-lab.component.html',
  styleUrls: ['./form-array-lab.component.css']
})
export class FormArrayLabComponent {
  submitted = false;

  applicantForm = this.fb.group({
    applicantName: ['', Validators.required],
    contacts: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {
    this.addContact();
  }

  get contacts(): FormArray {
    return this.applicantForm.get('contacts') as FormArray;
  }

  addContact(): void {
    this.contacts.push(this.createContactGroup());
  }

  removeContact(index: number): void {
    if (this.contacts.length === 1) {
      return;
    }

    this.contacts.removeAt(index);
  }

  save(): void {
    this.submitted = true;
    this.applicantForm.markAllAsTouched();

    if (this.applicantForm.invalid) {
      return;
    }

    console.log('FormArray Lab Value', this.applicantForm.value);
  }

  private createContactGroup(): FormGroup {
    return this.fb.group({
      type: ['Phone', Validators.required],
      value: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  asControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
