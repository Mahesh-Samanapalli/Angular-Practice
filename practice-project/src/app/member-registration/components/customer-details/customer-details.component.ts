import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
      const validators = this.getValidatorsForField(field, false);
      formGroup[field.paramName] = [field.paramValue || '', validators];
    });

    // Add checkbox for current address
    formGroup['sameAsPermanent'] = [false];

    // Build secondary life assured fields (initially without validators)
    this.fieldConfig.forEach(field => {
      const validators = this.getValidatorsForField(field, true);
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
        const validators = this.getValidatorsForField(field, true, this.isJointLife);
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
      if (field.errors['requiredTrue']) {
        return `${this.getFieldLabel(fieldName)} must be checked`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} must be greater than ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `${this.getFieldLabel(fieldName)} must be less than ${field.errors['max'].max}`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} must be at most ${field.errors['maxlength'].requiredLength} characters`;
      }
      if (field.errors['pattern']) {
        return `Invalid ${this.getFieldLabel(fieldName)}`;
      }
      if (field.errors['invalidDate']) {
        return `Invalid date for ${this.getFieldLabel(fieldName)}`;
      }
      if (field.errors['minDate']) {
        return `${this.getFieldLabel(fieldName)} must be on or after ${field.errors['minDate'].required}`;
      }
      if (field.errors['maxDate']) {
        return `${this.getFieldLabel(fieldName)} must be on or before ${field.errors['maxDate'].required}`;
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
    const type = (field?.paramType || 'TEXT').toString().toUpperCase();

    switch (type) {
      case 'EMAIL':
        return 'email';
      case 'NUMBER':
        return 'number';
      case 'DATE':
        return 'date';
      case 'PASSWORD':
        return 'password';
      case 'PHONE':
      case 'MOBILE':
        return 'tel';
      case 'URL':
        return 'url';
      case 'TIME':
        return 'time';
      case 'DATETIME':
      case 'DATETIME_LOCAL':
        return 'datetime-local';
      case 'CHECKBOX':
        return 'checkbox';
      case 'RADIO':
        return 'radio';
      case 'TEXTAREA':
        return 'textarea';
      case 'SELECT':
        return 'select';
      case 'TEXT':
      default:
        return 'text';
    }
  }

  // New helper: build validators based on field metadata and whether it's secondary
  private getValidatorsForField(field: any, isSecondary: boolean, jointRequired: boolean = false): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    const required = field.paramRequired && (!isSecondary || jointRequired);
    if (required) {
      if ((field.paramType || '').toString().toUpperCase() === 'CHECKBOX') {
        validators.push(Validators.requiredTrue);
      } else {
        validators.push(Validators.required);
      }
    }

    const type = (field?.paramType || 'TEXT').toString().toUpperCase();

    switch (type) {
      case 'EMAIL':
        validators.push(Validators.email);
        if (field.paramPattern) validators.push(Validators.pattern(field.paramPattern));
        break;
      case 'NUMBER':
        if (field.paramMinValue !== undefined) validators.push(Validators.min(Number(field.paramMinValue)));
        if (field.paramMaxValue !== undefined) validators.push(Validators.max(Number(field.paramMaxValue)));
        if (field.paramPattern) validators.push(Validators.pattern(field.paramPattern));
        break;
      case 'PASSWORD':
        // default: min length 8 and at least one number and one letter if not provided
        if (field.paramMinLength) validators.push(Validators.minLength(Number(field.paramMinLength)));
        else validators.push(Validators.minLength(8));
        const pwdPattern = field.paramPattern || '^(?=.*[A-Za-z])(?=.*\\d).+$';
        validators.push(Validators.pattern(pwdPattern));
        break;
      case 'PHONE':
      case 'MOBILE':
        // basic phone pattern
        const phonePattern = field.paramPattern || '^\\+?[0-9\\-\\s]{7,20}$';
        validators.push(Validators.pattern(phonePattern));
        break;
      case 'URL':
        const urlPattern = field.paramPattern || '^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]{2,}(\\/.*)?$';
        validators.push(Validators.pattern(urlPattern));
        break;
      case 'TEXT':
      case 'TEXTAREA':
        if (field.paramMinLength) validators.push(Validators.minLength(Number(field.paramMinLength)));
        if (field.paramMaxLength) validators.push(Validators.maxLength(Number(field.paramMaxLength)));
        if (field.paramPattern) validators.push(Validators.pattern(field.paramPattern));
        break;
      case 'DATE':
        // date range validator
        validators.push(this.dateRangeValidator(field.paramMinDate, field.paramMaxDate));
        break;
      default:
        if (field.paramPattern) validators.push(Validators.pattern(field.paramPattern));
    }

    return validators;
  }

  private dateRangeValidator(minDate?: string, maxDate?: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      const val = new Date(control.value);
      if (isNaN(val.getTime())) return { invalidDate: true };
      if (minDate) {
        const min = new Date(minDate);
        if (!isNaN(min.getTime()) && val < min) return { minDate: { required: minDate } };
      }
      if (maxDate) {
        const max = new Date(maxDate);
        if (!isNaN(max.getTime()) && val > max) return { maxDate: { required: maxDate } };
      }
      return null;
    };
  }

}
