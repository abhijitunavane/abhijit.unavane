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
  PhotographyComponent } from './components/components';
import { PhotographyDetailsDialogComponent } from './components/photography/photography-details-dialog/photography-details-dialog.component';

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
    PhotographyDetailsDialogComponent
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
