import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

interface ClaimRow {
  claimId: string;
  policyNo: string;
  claimant: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-insurance-dashboard',
  templateUrl: './insurance-dashboard.component.html',
  styleUrls: ['./insurance-dashboard.component.css']
})
export class InsuranceDashboardComponent implements OnInit, OnDestroy {
  isSmallScreen = false;
  private breakpointSub?: Subscription;

  quickQuoteForm: FormGroup;

  kpis = [
    { label: 'Active Policies', value: 12432, icon: 'verified_user' },
    { label: 'Pending Claims', value: 87, icon: 'assignment' },
    { label: 'Premium (Monthly)', value: '$1.2M', icon: 'payments' },
    { label: 'Conversion Rate', value: '7.8%', icon: 'trending_up' }
  ];

  displayedColumns: (keyof ClaimRow | 'actions')[] = ['claimId', 'policyNo', 'claimant', 'amount', 'status', 'actions'];
  dataSource = new MatTableDataSource<ClaimRow>([
    { claimId: 'CLM-10231', policyNo: 'POL-88912', claimant: 'John Carter', amount: 4200, status: 'Pending' },
    { claimId: 'CLM-10230', policyNo: 'POL-77654', claimant: 'Emma Watson', amount: 12500, status: 'Approved' },
    { claimId: 'CLM-10229', policyNo: 'POL-55221', claimant: 'Rahul Mehta', amount: 2100, status: 'Rejected' },
    { claimId: 'CLM-10228', policyNo: 'POL-33910', claimant: 'Sophia Lee', amount: 980, status: 'Pending' }
  ]);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder
  ) {
    this.quickQuoteForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      dob: [null, Validators.required],
      sumAssured: [500000, [Validators.required, Validators.min(10000)]],
      product: ['term', Validators.required],
      smokingStatus: ['non-smoker', Validators.required],
      premiumFrequency: ['monthly', Validators.required]
    });
  }

  ngOnInit(): void {
    this.breakpointSub = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  ngOnDestroy(): void {
    this.breakpointSub?.unsubscribe();
  }

  submitQuickQuote(): void {
    if (this.quickQuoteForm.invalid) {
      this.quickQuoteForm.markAllAsTouched();
      return;
    }
    // In real app, call API here
    alert('Quick quote submitted!');
  }
}


