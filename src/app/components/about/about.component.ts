import { Component } from '@angular/core';
import { Experience } from '../../utils/experience';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  experiences: Experience[] = [
    {
      role: 'Software Engineer',
      companyName: 'Raja Software Labs Ltd.',
      companyLink: 'https://www.linkedin.com/company/raja-software/',
      type: 'Full-time',
      period: 'Jun 2022 - Present',
      location: 'Pune, Maharashtra, India',
      summary: `Acquired expertise in Android development using Java, including the MVVM architecture.
 Contributed to a LinkedIn Android project and honed code review skills, effectively addressing feedback.
 Proficiently worked with Git, creating PRs and fostering a strong grasp of review comments.
 Developed a Flutter app for the company.`,
      skills: [
        'Jira',
        'Flutter',
        'GraphQL',
        'Kotlin',
        'Java',
        'Android',
      ].join(' • '),
    },
    {
      role: 'Software Engineer Intern',
      companyName: 'Raja Software Labs Ltd.',
      companyLink: 'https://www.linkedin.com/company/raja-software/',
      type: 'Internship',
      period: 'Jan 2022 - Jun 2022',
      location: 'Pune, Maharashtra, India',
      summary: `Learned android framework and developed some demo apps. Explored fragment-based architecture for modular UI design and improved code reusability.`,
      skills: ['Android'].join('•'),
    },
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle('Abhijit Unavane • About');
  }
}
