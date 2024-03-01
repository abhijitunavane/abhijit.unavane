import { Component, OnInit } from '@angular/core';
import { Domain, domainMock } from './domain.mock';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrl: './domain.component.css'
})
export class DomainComponent implements OnInit {

  domain: Domain | undefined;

  constructor(private route: ActivatedRoute) {};

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.domain = domainMock.filter((domain) => domain.id === params.get('domain-id'))[0];
    });
  }
}
