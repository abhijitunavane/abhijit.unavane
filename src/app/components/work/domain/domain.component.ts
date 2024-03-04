import { Component, OnInit } from '@angular/core';
import { Domain, domainMock } from './domain.mock';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrl: './domain.component.css'
})
export class DomainComponent implements OnInit {

  domain: Domain | undefined;

  constructor(private route: ActivatedRoute, private titleService: Title) {
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.domain = domainMock.filter((domain) => domain.id === params.get('domain-id'))[0];
      this.titleService.setTitle(`Abhijit Unavane • ${this.domain.name}`);
    });
  }
}
