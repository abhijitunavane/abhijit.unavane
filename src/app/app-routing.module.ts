import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
  AboutComponent, 
  WorkComponent, 
  DomainComponent, 
  ProjectComponent, 
  PhotographyComponent,
  PhotographyCategoryComponent } from './components/components';

const routes: Routes = [
  { path: 'work', component: WorkComponent, pathMatch: 'full' },
  { path: 'work/:domain-id', component: DomainComponent, pathMatch: 'full' },
  { path: 'work/:domain-id/:project-id', component: ProjectComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'photography', component: PhotographyComponent, pathMatch: 'full' },
  { path: 'photography/category/:category-id', component: PhotographyCategoryComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'work'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
