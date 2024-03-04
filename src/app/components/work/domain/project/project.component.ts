import { Component, OnInit } from '@angular/core';
import { Project, projectMock } from './project.mock';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  project: Project | undefined

  constructor(private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.project = projectMock.filter((project) => project.id === params.get('project-id'))[0];
      this.titleService.setTitle(`Abhijit Unavane • ${this.project.name}`);
    });
  }
}
