import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  loanForm: FormGroup;
  fieldConfig: any[] = [];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedServiceService
  ) {
    this.loanForm = this.fb.group({});
  }

  ngOnInit() {
    this.loadFieldConfig();
    this.buildForm();
  }

  loadFieldConfig() {
    // Get loan details configuration from shared service
    const loanConfig = this.sharedService.paramConfig.find(
      (config: any) => config.header === 'LOAN_DETAILS'
    );
    
    if (loanConfig) {
      this.fieldConfig = loanConfig.paramValues;
    }
  }

  buildForm() {
    const formGroup: { [key: string]: any } = {};
    
    this.fieldConfig.forEach(field => {
      const validators = [];
      
      if (field.paramRequired) {
        validators.push(Validators.required);
      }
      
      if (field.paramType === 'NUMBER') {
        validators.push(Validators.min(0));
      }
      
      formGroup[field.paramName] = [field.paramValue || '', validators];
    });

    this.loanForm = this.fb.group(formGroup);
  }

  onSubmit() {
    if (this.loanForm.valid) {
      console.log('Loan Form Data:', this.loanForm.value);
      // Here you would typically send the data to your API
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.loanForm.controls).forEach(key => {
      const control = this.loanForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loanForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} must be greater than 0`;
      }
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const field = this.fieldConfig.find(f => f.paramName === fieldName);
    return field ? field.paramLabel : fieldName;
  }

  getFieldType(field: any): string {
    switch (field.paramType) {
      case 'TEXT':
        return 'text';
      case 'NUMBER':
        return 'number';
      case 'DATE':
        return 'date';
      default:
        return 'text';
    }
  }
}
