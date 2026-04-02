import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';

const routes: Routes = [
  {path:'pre-uw-gcp',component:MemberRegistrationComponent},
  {path:'',redirectTo:'pre-uw-gcp',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
