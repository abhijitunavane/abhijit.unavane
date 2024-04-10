import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomainService } from '../../../services/work/domain/domain.service';
import { Tables } from '../../../types/database.types';
import { UPDATE } from '../../../constants/superbase/superbase.tables.constant';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrl: './domain.component.css',
})
export class DomainComponent implements OnInit {

  domain: Tables<'domain'> | null | undefined;
  isError: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private service: DomainService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      this.titleService.setTitle(`Abhijit Unavane • ${params.get('domain-id')}`);
      await this.setupObservers(params.get('domain-id'));
    });
  }

  async setupObservers(value: any): Promise<void> {
    const {data, error} = await this.service.domain(value);
    
    if (error || (data !== null && data.length < 0)) {
      this.isError = true;
    } else if (data && data.length > 0) {
      const formattedData = data[0] as Tables<'domain'>;
      if (formattedData.image !== null) {
        const { data } = this.service.domainImage(formattedData.image);
        
        
        if (data && data.publicUrl) {
          formattedData.image = data.publicUrl;
        }
      }

      formattedData.projectList?.map(project => {
        const { data } = this.service.domainImage(project.image);
          
        if (data && data.publicUrl) {
          project.image = data.publicUrl;
        }
      });
      
      this.domain = formattedData;
    }

    this.isLoading = false;

    this.service.domainChanges().subscribe(update => {
      if (update !== null) {
        if (this.domain === undefined || this.domain === null) {
          return;
        }
        
        const newData = update.new;
        switch (update.eventType) {
          case UPDATE: {
            const domain: Tables<'domain'> = newData as Tables<'domain'>;
              if (this.domain.id === domain.id) {
                if (domain.image !== null) {
                  const { data } = this.service.domainImage(domain.image);
                  if (data !== null && data.publicUrl !== null) {
                    domain.image = data.publicUrl;
                  }
                }
                domain.projectList?.map(project => {
                  const { data } = this.service.domainImage(project.image);
                    
                  if (data && data.publicUrl) {
                    project.image = data.publicUrl;
                  }
                });

                this.domain = domain;
                return;
              }
            break;
          }
        }
      }
    });
  }
}
