import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../services/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customerForm!: FormGroup;
  fieldConfig: any[] = [];
  isJointLife: boolean = false;
  private lifeTypeSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedServiceService
  ) {
    this.customerForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadFieldConfig();
    this.buildForm();
    this.subscribeToLifeTypeChanges();
  }

  ngOnDestroy(): void {
    if (this.lifeTypeSubscription) {
      this.lifeTypeSubscription.unsubscribe();
    }
  }

  loadFieldConfig() {
    // Get customer details configuration from shared service
    const customerConfig = this.sharedService.paramConfig.find(
      (config: any) => config.header === 'CUSTOMER_DETAILS'
    );
    
    if (customerConfig) {
      this.fieldConfig = customerConfig.paramValues;
    }
  }

  buildForm() {
    const formGroup: { [key: string]: any } = {};
    
    // Build primary life assured fields
    this.fieldConfig.forEach(field => {
      const validators = [];
      
      if (field.paramRequired) {
        validators.push(Validators.required);
      }
      
      if (field.paramType === 'EMAIL') {
        validators.push(Validators.email);
      }
      
      if (field.paramType === 'NUMBER') {
        validators.push(Validators.min(0));
      }
      
      formGroup[field.paramName] = [field.paramValue || '', validators];
    });

    // Add checkbox for current address
    formGroup['sameAsPermanent'] = [false];

    // Build secondary life assured fields (initially without validators)
    this.fieldConfig.forEach(field => {
      const validators = [];
      
      if (field.paramType === 'EMAIL') {
        validators.push(Validators.email);
      }
      
      if (field.paramType === 'NUMBER') {
        validators.push(Validators.min(0));
      }
      
      formGroup['SECONDARY_' + field.paramName] = [field.paramValue || '', validators];
    });

    // Add checkbox for secondary current address
    formGroup['secondarySameAsPermanent'] = [false];

    this.customerForm = this.fb.group(formGroup);
  }

  private subscribeToLifeTypeChanges(): void {
    this.lifeTypeSubscription = this.sharedService.lifeType$.subscribe(lifeType => {
      this.isJointLife = lifeType === 'joint';
      this.updateSecondaryFieldsValidation();
    });
  }

  private updateSecondaryFieldsValidation(): void {
    this.fieldConfig.forEach(field => {
      const secondaryFieldName = 'SECONDARY_' + field.paramName;
      const control = this.customerForm.get(secondaryFieldName);
      
      if (control) {
        const validators = [];
        
        if (this.isJointLife && field.paramRequired) {
          validators.push(Validators.required);
        }
        
        if (field.paramType === 'EMAIL') {
          validators.push(Validators.email);
        }
        
        if (field.paramType === 'NUMBER') {
          validators.push(Validators.min(0));
        }
        
        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.customerForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} must be greater than 0`;
      }
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    // Remove SECONDARY_ prefix for label lookup
    const baseFieldName = fieldName.replace('SECONDARY_', '');
    const field = this.fieldConfig.find(f => f.paramName === baseFieldName);
    return field ? field.paramLabel : fieldName;
  }

  getFieldType(field: any): string {
    switch (field.paramType) {
      case 'EMAIL':
        return 'email';
      case 'NUMBER':
        return 'number';
      case 'DATE':
        return 'date';
      case 'TEXT':
      default:
        return 'text';
    }
  }
}
