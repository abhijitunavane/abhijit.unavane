import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { 
  NavbarComponent, 
  FooterComponent, 
  AboutComponent, 
  WorkComponent,
  GithubCornerComponent,
  DomainComponent,
  ProjectComponent,
  TooltipComponent,
  PhotographyComponent,
  PhotographyDetailsDialogComponent,
  PhotographyCategoryComponent,
  ToastComponent,
  SquareSpinnerComponent } from './components/components';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    WorkComponent,
    GithubCornerComponent,
    DomainComponent,
    ProjectComponent,
    TooltipComponent,
    PhotographyComponent,
    PhotographyDetailsDialogComponent,
    PhotographyCategoryComponent,
    ToastComponent,
    SquareSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
