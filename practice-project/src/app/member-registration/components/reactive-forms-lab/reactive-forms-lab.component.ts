import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService, uniquePanValidator } from '../../services/validation-service.service';

type DynamicFieldType = 'text' | 'number' | 'select';

interface DynamicFieldConfig {
  controlName: string;
  label: string;
  type: DynamicFieldType;
  options?: Array<{ label: string; value: string }>; // used for select
  showWhen?: (form: FormGroup) => boolean;
}

@Component({
  selector: 'app-reactive-forms-lab',
  templateUrl: './reactive-forms-lab.component.html',
  styleUrls: ['./reactive-forms-lab.component.css']
})
export class ReactiveFormsLabComponent implements OnInit {
  labForm!: FormGroup;

  dynamicFieldConfigs: DynamicFieldConfig[] = [
    {
      controlName: 'panNumber',
      label: 'PAN Number',
      type: 'text',
      showWhen: (form) => form.get('age')?.value >= 18
    },
    {
      controlName: 'educationLevel',
      label: 'Education Level',
      type: 'select',
      options: [
        { label: 'High School', value: 'high_school' },
        { label: 'Bachelors', value: 'bachelors' },
        { label: 'Masters', value: 'masters' },
        { label: 'PhD', value: 'phd' }
      ],
      showWhen: () => true
    }
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupEmploymentTypeSideEffects();
  }

  private initializeForm(): void {
    this.labForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(0)]],
      employmentType: ['unemployed', Validators.required], // salaried | business | unemployed

      // conditionally shown controls
      salary: [{ value: null, disabled: true }, [Validators.min(0)]],
      businessName: [{ value: '', disabled: true }],
      businessTurnover: [{ value: null, disabled: true }, [Validators.min(0)]],

      // dynamic area based on config
      panNumber: [
        '',
        {
          validators: [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)],
          asyncValidators: [uniquePanValidator(this.validationService)],
          updateOn: 'blur'
        }
      ],
      educationLevel: ['bachelors'],

      // nested FormArray examples
      addresses: this.formBuilder.array([]),
      loans: this.formBuilder.array([]),
      contacts: this.formBuilder.array([]),

      // nested group example
      preferences: this.formBuilder.group({
        newsletter: [true],
        notifications: this.formBuilder.group({
          email: [true],
          sms: [false]
        })
      }),

      // deep array example
      dependents: this.formBuilder.array([])
    });

    // seed with one row for each array for practice
    this.addAddress();
    this.addLoan();
    this.addContact();
    this.addDependent();
  }

  private setupEmploymentTypeSideEffects(): void {
    this.labForm.get('employmentType')?.valueChanges.subscribe((type: string) => {
      const salary = this.labForm.get('salary');
      const businessName = this.labForm.get('businessName');
      const businessTurnover = this.labForm.get('businessTurnover');

      if (!salary || !businessName || !businessTurnover) return;

      // reset and update validators/disabled state based on employment type
      if (type === 'salaried') {
        salary.enable({ emitEvent: false });
        salary.addValidators([Validators.required, Validators.min(0)]);
        businessName.reset('', { emitEvent: false });
        businessTurnover.reset(null, { emitEvent: false });
        businessName.disable({ emitEvent: false });
        businessTurnover.disable({ emitEvent: false });
        businessName.clearValidators();
        businessTurnover.clearValidators();
      } else if (type === 'business') {
        businessName.enable({ emitEvent: false });
        businessTurnover.enable({ emitEvent: false });
        businessName.addValidators([Validators.required]);
        businessTurnover.addValidators([Validators.required, Validators.min(0)]);
        salary.reset(null, { emitEvent: false });
        salary.disable({ emitEvent: false });
        salary.clearValidators();
      } else {
        // unemployed
        salary.reset(null, { emitEvent: false });
        salary.disable({ emitEvent: false });
        salary.clearValidators();
        businessName.reset('', { emitEvent: false });
        businessTurnover.reset(null, { emitEvent: false });
        businessName.disable({ emitEvent: false });
        businessTurnover.disable({ emitEvent: false });
        businessName.clearValidators();
        businessTurnover.clearValidators();
      }

      salary.updateValueAndValidity({ emitEvent: false });
      businessName.updateValueAndValidity({ emitEvent: false });
      businessTurnover.updateValueAndValidity({ emitEvent: false });
    });
  }

  // getters for arrays
  get addresses(): FormArray<FormGroup> {
    return this.labForm.get('addresses') as FormArray<FormGroup>;
  }

  get loans(): FormArray<FormGroup> {
    return this.labForm.get('loans') as FormArray<FormGroup>;
  }

  get contacts(): FormArray<FormGroup> {
    return this.labForm.get('contacts') as FormArray<FormGroup>;
  }

  get dependents(): FormArray<FormGroup> {
    return this.labForm.get('dependents') as FormArray<FormGroup>;
  }

  // factory helpers
  private createAddressGroup(): FormGroup {
    return this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]]
    });
  }

  private createLoanGroup(): FormGroup {
    return this.formBuilder.group({
      type: ['home', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      tenureMonths: [12, [Validators.required, Validators.min(1)]]
    });
  }

  private createContactGroup(): FormGroup {
    return this.formBuilder.group({
      type: ['mobile', Validators.required],
      value: ['', Validators.required]
    });
  }

  private createDependentGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      relation: ['child', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]]
    });
  }

  // array operations
  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  addLoan(): void {
    this.loans.push(this.createLoanGroup());
  }

  removeLoan(index: number): void {
    this.loans.removeAt(index);
  }

  addContact(): void {
    this.contacts.push(this.createContactGroup());
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  addDependent(): void {
    this.dependents.push(this.createDependentGroup());
  }

  removeDependent(index: number): void {
    this.dependents.removeAt(index);
  }

  // dynamic field visibility helper used by template
  shouldShow(field: DynamicFieldConfig): boolean {
    return field.showWhen ? field.showWhen(this.labForm) : true;
  }

  // debug helpers
  getControl(path: string): AbstractControl | null {
    return this.labForm.get(path);
  }

  loadSampleData(): void {
    this.labForm.patchValue({
      name: 'Mahesh',
      email: 'mahesh@example.com',
      age: 27,
      employmentType: 'salaried',
      salary: 1200000,
      educationLevel: 'masters',
      panNumber: 'ABCDE1234F',
      preferences: {
        newsletter: true,
        notifications: { email: true, sms: false }
      }
    });

    this.addresses.clear();
    this.addresses.push(
      this.formBuilder.group({ street: 'MG Road', city: 'Bengaluru', zip: '560001' })
    );
    this.addresses.push(
      this.formBuilder.group({ street: 'Banjara Hills', city: 'Hyderabad', zip: '500034' })
    );

    this.loans.clear();
    this.loans.push(this.formBuilder.group({ type: 'home', amount: 5000000, tenureMonths: 240 }));

    this.contacts.clear();
    this.contacts.push(this.formBuilder.group({ type: 'mobile', value: '+91-9000000000' }));
  }

  onSubmit(): void {
    if (this.labForm.invalid) {
      this.labForm.markAllAsTouched();
      return;
    }
    // For now, just log. You can wire this to a service later.
    // eslint-disable-next-line no-console
    console.log('Form submitted', this.labForm.getRawValue());
  }
}


