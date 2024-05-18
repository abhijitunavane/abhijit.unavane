import { Component, OnInit } from '@angular/core';
import { VisitorsService } from './services/visitors/visitors.service';
import { Tables } from './types/database.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  VISITOR_ID_KEY: string = 'visitorId';

  constructor(private visitorsService: VisitorsService) {}

  ngOnInit(): void {
    this.verifyIfOldVisitor();
  }

  async verifyIfOldVisitor(): Promise<void> {
    const visitorId = localStorage.getItem(this.VISITOR_ID_KEY);
    if (visitorId === undefined || visitorId === null) {
      const {data, error} = await this.visitorsService.insert({"name": "Visitor"});
      if (error !== null && data === null) {
        return;
      }

      const visitors = data as Tables<'visitors'>[];
      localStorage.setItem(this.VISITOR_ID_KEY, visitors[0].id);
    } 
  }
}
