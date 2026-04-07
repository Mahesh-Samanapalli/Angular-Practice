import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MphMemberRegistrationComponent } from './components/mph-member-registration/mph-member-registration.component';
import { ReactiveFormsLabComponent } from './components/reactive-forms-lab/reactive-forms-lab.component';
import { FormsPlaygroundComponent } from './components/forms-playground/forms-playground.component';
import { InsuranceDashboardComponent } from './components/insurance-dashboard/insurance-dashboard.component';
import { InsurancePracticeComponent } from './components/insurance-practice/insurance-practice.component';
import { TemplateDrivenLabComponent } from './components/template-driven-lab/template-driven-lab.component';
import { ProfileFormComponent } from './playground/components/profile-form/profile-form.component';
import { ProfileFormPracticeComponent } from './components/profile-form-practice/profile-form-practice.component';
import { JobApplicationFormPracticeComponent } from './components/job-application-form-practice/job-application-form-practice.component';
import { EventRegistrationFormPracticeComponent } from './components/event-registration-form-practice/event-registration-form-practice.component';

const routes: Routes = [
  { path: '', component: MphMemberRegistrationComponent },
  { path: 'mph-member', component: MphMemberRegistrationComponent },
  { path: 'forms-lab', component: ReactiveFormsLabComponent },
  { path: 'template-driven-lab', component: TemplateDrivenLabComponent },
  { path: 'forms-play', component: FormsPlaygroundComponent },
  { path: 'profile', component: ProfileFormPracticeComponent},
  { path: 'job-application-form', component: JobApplicationFormPracticeComponent },
  { path: 'event-registration-form', component: EventRegistrationFormPracticeComponent },
  {
    path: 'playground',
    loadChildren: () =>
      import('./playground/playground.module').then(m => m.PlaygroundModule)
  },
  { path: 'insurance/dashboard', component: InsuranceDashboardComponent },
  { path: 'insurance/practice', component: InsurancePracticeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRegistrationRoutingModule {}
