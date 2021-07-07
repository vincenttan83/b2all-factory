import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { DesignareComponent } from './components/designare/designare.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicSectionComponent } from './components/dynamic-section/dynamic-section.component';
import { HomeComponent } from './components/home/home.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';

const routes: Routes = [{
  path: '', component: DemoComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'multi-select', component: MultiSelectComponent },
    { path: 'dynamic-form', component: DynamicFormComponent },
    { path: 'dynamic-section', component: DynamicSectionComponent },
    { path: 'designare', component: DesignareComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
