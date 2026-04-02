import { Injectable } from '@angular/core';

// interfaces for profile data
export interface address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: address;
  skills: string[];
  emergencyContact: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

// This service will hold the profile data and provide methods to update and retrieve it
 private profileData: ProfileData = {
    firstName:'',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    skills: [],
    emergencyContact: []
  };

  constructor() { }

  updateProfileData(data: any) {
    this.profileData = data;
    console.log('Profile data updated:', this.profileData);
  }

  getProfileData(): ProfileData {
    return this.profileData;
  }
}
