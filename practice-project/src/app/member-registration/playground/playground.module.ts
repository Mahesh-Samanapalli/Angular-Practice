import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundShellComponent } from './components/playground-shell/playground-shell.component';
import { FormBuilderLabComponent } from './components/form-builder-lab/form-builder-lab.component';
import { TemplateLabComponent } from './components/template-lab/template-lab.component';
import { FormArrayLabComponent } from './components/form-array-lab/form-array-lab.component';
import { OnPushLabComponent } from './components/onpush-lab/onpush-lab.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

@NgModule({
  declarations: [
    PlaygroundShellComponent,
    FormBuilderLabComponent,
    TemplateLabComponent,
    FormArrayLabComponent,
    OnPushLabComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlaygroundRoutingModule
  ]
})
export class PlaygroundModule {}
