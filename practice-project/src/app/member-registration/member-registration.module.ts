import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MemberRegistrationRoutingModule } from './member-registration-routing.module';
import { MemberRegistrationComponent } from './member-registration.component';
import { LoanDetailsComponent } from './components/loan-details/loan-details.component';
import { LifeInsuranceComponent } from './components/life-insurance/life-insurance.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MphMemberRegistrationComponent } from './components/mph-member-registration/mph-member-registration.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsLabComponent } from './components/reactive-forms-lab/reactive-forms-lab.component';
import { FormsPlaygroundComponent } from './components/forms-playground/forms-playground.component';
import { InsuranceDashboardComponent } from './components/insurance-dashboard/insurance-dashboard.component';
import { InsurancePracticeComponent } from './components/insurance-practice/insurance-practice.component';
import { TemplateDrivenLabComponent } from './components/template-driven-lab/template-driven-lab.component';


@NgModule({
  declarations: [
    MemberRegistrationComponent,
    LoanDetailsComponent,
    LifeInsuranceComponent,
    CustomerDetailsComponent,
    HeaderComponent,
    FooterComponent,
    MphMemberRegistrationComponent,
    ReactiveFormsLabComponent,
    FormsPlaygroundComponent,
    InsuranceDashboardComponent,
    InsurancePracticeComponent,
    TemplateDrivenLabComponent
  ],
  imports: [
    CommonModule,
    MemberRegistrationRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule
  ]
})
export class MemberRegistrationModule { }
