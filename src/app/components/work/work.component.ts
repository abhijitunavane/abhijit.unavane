import { Component } from '@angular/core';
import { Link } from '../../utils/link';
import { workMockList, WorkDomain } from './work.mock';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent {
  workList: WorkDomain[] = workMockList;

  constructor(private titleService: Title) {
    this.titleService.setTitle('Abhijit Unavane • SDE');
  }
}
