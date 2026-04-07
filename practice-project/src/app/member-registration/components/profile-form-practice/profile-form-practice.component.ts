import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile-form-practice',
  templateUrl: './profile-form-practice.component.html',
  styleUrls: ['./profile-form-practice.component.css']
})
export class ProfileFormPracticeComponent {

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]),
    panNumber: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]$')]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
    }),
    skills: new FormArray([]),

  });

  constructor() { }

  get skills() {
    return this.profileForm.get('skills') as FormArray;
  }

  addSkill(skill: string) {
    if (skill.trim() !== '') {
      this.skills.push(new FormControl(skill, Validators.required));
    }
  }
  removeSkill(index: number) {  
    this.skills.removeAt(index);  
  } 

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form Submitted', this.profileForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

}