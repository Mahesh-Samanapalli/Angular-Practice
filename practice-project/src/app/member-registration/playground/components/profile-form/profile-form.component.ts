import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';  
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent {
  constructor(private sharedService: SharedServiceService) {}

  // Reactive form without FormBuilder
  profileFormWithoutFormBuilder = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
    }),
    skills: new FormArray([]),
    emergencyContact: new FormArray([]),
  });

  get skills (){
   return this.profileFormWithoutFormBuilder.get('skills') as FormArray;
  }

  get emergencyContact(){
    return this.profileFormWithoutFormBuilder.get('emergencyContact') as FormArray;
  }

  addSkill(skill:string){
    if(skill.trim() !== ''){
      this.skills.push(new FormControl(skill));
    }
  }

  removeSkill(index:number){
    this.skills.removeAt(index);
  }

  addContact(contact:string){
    if(contact.trim() !== ''){
      this.emergencyContact.push(new FormControl(contact));
    }
  }

  removeContact(index:number){
    this.emergencyContact.removeAt(index);
  }

  resetForm(){
    this.profileFormWithoutFormBuilder.reset();
    this.skills.clear();
    this.emergencyContact.clear();
  }

  onSubmit() {
    if(this.profileFormWithoutFormBuilder.valid){
      this.sharedService.updateProfileData(this.profileFormWithoutFormBuilder.value);
      console.log('Form Submitted', this.profileFormWithoutFormBuilder.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
