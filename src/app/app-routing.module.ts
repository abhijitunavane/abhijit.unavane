import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent, WorkComponent, DomainComponent, ProjectComponent } from './components/components';

const routes: Routes = [
  { path: '', redirectTo: 'work', pathMatch: 'full' },
  { path: 'work', component: WorkComponent, pathMatch: 'full' },
  { path: 'work/:domain-id', component: DomainComponent, pathMatch: 'full' },
  { path: 'work/:domain-id/:project-id', component: ProjectComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
