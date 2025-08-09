import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MphMemberRegistrationComponent } from './components/mph-member-registration/mph-member-registration.component';
import { ReactiveFormsLabComponent } from './components/reactive-forms-lab/reactive-forms-lab.component';
import { FormsPlaygroundComponent } from './components/forms-playground/forms-playground.component';
import { InsuranceDashboardComponent } from './components/insurance-dashboard/insurance-dashboard.component';
import { InsurancePracticeComponent } from './components/insurance-practice/insurance-practice.component';

const routes: Routes = [
  { path: '', component: MphMemberRegistrationComponent },
  { path: 'mph-member', component: MphMemberRegistrationComponent },
  { path: 'forms-lab', component: ReactiveFormsLabComponent },
  { path: 'forms-play', component: FormsPlaygroundComponent }
  ,
  { path: 'insurance/dashboard', component: InsuranceDashboardComponent },
  { path: 'insurance/practice', component: InsurancePracticeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRegistrationRoutingModule {}
