import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder-lab',
  templateUrl: './form-builder-lab.component.html',
  styleUrls: ['./form-builder-lab.component.css']
})
export class FormBuilderLabComponent {
  submitted = false;

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    })
  });

  constructor(private fb: FormBuilder) {}

  save(): void {
    this.submitted = true;
    this.profileForm.markAllAsTouched();

    if (this.profileForm.invalid) {
      return;
    }

    console.log('FormBuilder Lab Value', this.profileForm.value);
  }
}
