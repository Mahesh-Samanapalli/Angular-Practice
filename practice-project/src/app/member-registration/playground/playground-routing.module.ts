import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaygroundShellComponent } from './components/playground-shell/playground-shell.component';
import { FormBuilderLabComponent } from './components/form-builder-lab/form-builder-lab.component';
import { TemplateLabComponent } from './components/template-lab/template-lab.component';
import { FormArrayLabComponent } from './components/form-array-lab/form-array-lab.component';
import { OnPushLabComponent } from './components/onpush-lab/onpush-lab.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundShellComponent,
    children: [
      { path: '', redirectTo: 'form-builder', pathMatch: 'full' },
      { path: 'form-builder', component: FormBuilderLabComponent },
      { path: 'template-blocks', component: TemplateLabComponent },
      { path: 'form-array', component: FormArrayLabComponent },
      { path: 'onpush', component: OnPushLabComponent },
      { path: 'profile-form', component: ProfileFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule {}
