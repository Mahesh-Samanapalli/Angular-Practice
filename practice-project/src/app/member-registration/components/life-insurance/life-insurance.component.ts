import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-life-insurance',
  templateUrl: './life-insurance.component.html',
  styleUrls: ['./life-insurance.component.css']
})
export class LifeInsuranceComponent implements OnInit {
  insuranceForm: FormGroup;
  loanAmount: number = 0; // This will be fetched from loan details
  selectedLifeType: 'single' | 'joint' = 'single';

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedServiceService
  ) {
    this.insuranceForm = this.fb.group({});
  }

  ngOnInit() {
    this.buildForm();
    this.setupFormListeners();
  }

  buildForm() {
    this.insuranceForm = this.fb.group({
      // Life Type Selection
      lifeType: ['single', Validators.required],
      
      // Primary Life Details
      primaryDeathBenefit: [0, [Validators.required, Validators.min(0)]],
      primaryCriticalIllness: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      
      // Secondary Life Details (for Joint Life)
      secondaryDeathBenefit: [0, [Validators.min(0)]],
      secondaryCriticalIllness: [{ value: 0, disabled: true }, [Validators.min(0)]]
    });
  }

  setupFormListeners() {
    // Listen to life type changes
    this.insuranceForm.get('lifeType')?.valueChanges.subscribe(value => {
      this.selectedLifeType = value;
      this.onLifeTypeChange(value);
    });

    // Listen to primary death benefit changes
    this.insuranceForm.get('primaryDeathBenefit')?.valueChanges.subscribe(value => {
      this.onPrimaryDeathBenefitChange(value);
    });

    // Listen to secondary death benefit changes (for joint life)
    this.insuranceForm.get('secondaryDeathBenefit')?.valueChanges.subscribe(value => {
      this.onSecondaryDeathBenefitChange(value);
    });
  }

  onLifeTypeChange(lifeType: 'single' | 'joint') {
    this.selectedLifeType = lifeType;
    
    // Notify shared service about life type change
    this.sharedService.updateLifeType(lifeType);
    
    if (lifeType === 'single') {
      // Reset secondary life fields and disable them
      this.insuranceForm.patchValue({
        secondaryDeathBenefit: 0,
        secondaryCriticalIllness: 0
      });
      this.insuranceForm.get('secondaryDeathBenefit')?.disable();
      this.insuranceForm.get('secondaryCriticalIllness')?.disable();
      
      // Recalculate primary life based on full loan amount
      this.recalculatePrimaryLife();
    } else {
      // Enable secondary life fields
      this.insuranceForm.get('secondaryDeathBenefit')?.enable();
      this.insuranceForm.get('secondaryCriticalIllness')?.enable();
      
      // Recalculate both primary and secondary life
      this.recalculateJointLife();
    }
  }

  onPrimaryDeathBenefitChange(value: number) {
    const loanAmount = this.getLoanAmount();
    
    if (this.selectedLifeType === 'single') {
      this.handleSingleLifeDeathBenefitChange(value, loanAmount);
    } else {
      this.handleJointLifePrimaryDeathBenefitChange(value, loanAmount);
    }
  }

  onSecondaryDeathBenefitChange(value: number) {
    const loanAmount = this.getLoanAmount();
    this.handleJointLifeSecondaryDeathBenefitChange(value, loanAmount);
  }

  handleSingleLifeDeathBenefitChange(value: number, loanAmount: number) {
    if (value > loanAmount) {
      this.insuranceForm.patchValue({
        primaryDeathBenefit: loanAmount,
        primaryCriticalIllness: 0
      });
      this.showSnackBar(`Maximum Death Benefit is ${loanAmount.toLocaleString()}`);
    } else if (value < 0) {
      this.insuranceForm.patchValue({
        primaryDeathBenefit: 0,
        primaryCriticalIllness: loanAmount
      });
    } else {
      const criticalIllness = loanAmount - value;
      this.insuranceForm.patchValue({
        primaryCriticalIllness: criticalIllness
      });
    }
  }

  handleJointLifePrimaryDeathBenefitChange(value: number, loanAmount: number) {
    const secondaryDeathBenefit = this.insuranceForm.get('secondaryDeathBenefit')?.value || 0;
    const totalDeathBenefit = value + secondaryDeathBenefit;
    
    if (totalDeathBenefit > loanAmount) {
      // Adjust secondary death benefit
      const maxSecondary = Math.max(0, loanAmount - value);
      this.insuranceForm.patchValue({
        secondaryDeathBenefit: maxSecondary,
        secondaryCriticalIllness: 0
      });
      this.showSnackBar('Secondary Death Benefit adjusted automatically');
    }
    
    this.recalculateJointLife();
  }

  handleJointLifeSecondaryDeathBenefitChange(value: number, loanAmount: number) {
    const primaryDeathBenefit = this.insuranceForm.get('primaryDeathBenefit')?.value || 0;
    const totalDeathBenefit = primaryDeathBenefit + value;
    
    if (totalDeathBenefit > loanAmount) {
      const maxSecondary = Math.max(0, loanAmount - primaryDeathBenefit);
      this.insuranceForm.patchValue({
        secondaryDeathBenefit: maxSecondary,
        secondaryCriticalIllness: 0
      });
      this.showSnackBar('Secondary Death Benefit cannot exceed remaining amount');
    } else {
      this.recalculateJointLife();
    }
  }

  recalculatePrimaryLife() {
    const loanAmount = this.getLoanAmount();
    const primaryDeathBenefit = this.insuranceForm.get('primaryDeathBenefit')?.value || 0;
    const primaryCriticalIllness = loanAmount - primaryDeathBenefit;
    
    this.insuranceForm.patchValue({
      primaryCriticalIllness: primaryCriticalIllness
    });
  }

  recalculateJointLife() {
    const loanAmount = this.getLoanAmount();
    const primaryDeathBenefit = this.insuranceForm.get('primaryDeathBenefit')?.value || 0;
    const secondaryDeathBenefit = this.insuranceForm.get('secondaryDeathBenefit')?.value || 0;
    
    const totalDeathBenefit = primaryDeathBenefit + secondaryDeathBenefit;
    const totalCriticalIllness = loanAmount - totalDeathBenefit;
    
    // Split critical illness proportionally (can be customized based on business rules)
    const primaryCriticalIllness = totalCriticalIllness * (primaryDeathBenefit / totalDeathBenefit) || 0;
    const secondaryCriticalIllness = totalCriticalIllness - primaryCriticalIllness;
    
    this.insuranceForm.patchValue({
      primaryCriticalIllness: primaryCriticalIllness,
      secondaryCriticalIllness: secondaryCriticalIllness
    });
  }

  getLoanAmount(): number {
    // This will be fetched from loan details component or shared service
    // For now, using a mock value
    return 500000; // Mock loan amount
  }

  getPrimaryDeathBenefitHelperText(): string {
    const currentValue = this.insuranceForm.get('primaryDeathBenefit')?.value || 0;
    const loanAmount = this.getLoanAmount();
    
    if (this.selectedLifeType === 'single') {
      const criticalIllness = loanAmount - currentValue;
      return `Critical Illness will be ${criticalIllness.toLocaleString()}`;
    } else {
      const secondaryDeathBenefit = this.insuranceForm.get('secondaryDeathBenefit')?.value || 0;
      const remainingForSecondary = loanAmount - currentValue;
      return `Remaining for Secondary Life: ${remainingForSecondary.toLocaleString()}`;
    }
  }

  getSecondaryDeathBenefitHelperText(): string {
    const primaryDeathBenefit = this.insuranceForm.get('primaryDeathBenefit')?.value || 0;
    const loanAmount = this.getLoanAmount();
    const remainingForSecondary = loanAmount - primaryDeathBenefit;
    
    return `Maximum: ${remainingForSecondary.toLocaleString()}`;
  }

  isPrimaryDeathBenefitValid(): boolean {
    const value = this.insuranceForm.get('primaryDeathBenefit')?.value || 0;
    const loanAmount = this.getLoanAmount();
    return value >= 0 && value <= loanAmount;
  }

  isSecondaryDeathBenefitValid(): boolean {
    const primaryValue = this.insuranceForm.get('primaryDeathBenefit')?.value || 0;
    const secondaryValue = this.insuranceForm.get('secondaryDeathBenefit')?.value || 0;
    const loanAmount = this.getLoanAmount();
    return secondaryValue >= 0 && (primaryValue + secondaryValue) <= loanAmount;
  }

  showSnackBar(message: string) {
    // Simple console log for now, will implement proper snackbar later
    console.log(message);
  }

  getFormData() {
    return {
      lifeType: this.selectedLifeType,
      primaryLife: {
        deathBenefit: this.insuranceForm.get('primaryDeathBenefit')?.value,
        criticalIllness: this.insuranceForm.get('primaryCriticalIllness')?.value
      },
      secondaryLife: this.selectedLifeType === 'joint' ? {
        deathBenefit: this.insuranceForm.get('secondaryDeathBenefit')?.value,
        criticalIllness: this.insuranceForm.get('secondaryCriticalIllness')?.value
      } : null
    };
  }

  isFormValid(): boolean {
    const primaryDeathBenefit = this.insuranceForm.get('primaryDeathBenefit')?.value || 0;
    const primaryCriticalIllness = this.insuranceForm.get('primaryCriticalIllness')?.value || 0;
    const loanAmount = this.getLoanAmount();
    
    let isValid = primaryDeathBenefit + primaryCriticalIllness === loanAmount && 
                  primaryDeathBenefit >= 0 && 
                  primaryCriticalIllness >= 0;
    
    if (this.selectedLifeType === 'joint') {
      const secondaryDeathBenefit = this.insuranceForm.get('secondaryDeathBenefit')?.value || 0;
      const secondaryCriticalIllness = this.insuranceForm.get('secondaryCriticalIllness')?.value || 0;
      
      isValid = isValid && 
                (primaryDeathBenefit + secondaryDeathBenefit + primaryCriticalIllness + secondaryCriticalIllness) === loanAmount &&
                secondaryDeathBenefit >= 0 && 
                secondaryCriticalIllness >= 0;
    }
    
    return isValid;
  }
}
