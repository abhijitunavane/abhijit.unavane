import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProjectService } from '../../../../services/work/domain/project/project.service';
import { Tables } from '../../../../types/database.types';
import { UPDATE } from '../../../../constants/superbase/superbase.tables.constant';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  project: Tables<'project'> | undefined
  hasError: boolean = false;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private titleService: Title, private service: ProjectService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.titleService.setTitle(`Abhijit Unavane • ${params.get('project-id')}`);
      this.setupObservers(params.get('project-id'));
    });
  }

  async setupObservers(value: any): Promise<void> {
    const {data, error} = await this.service.find(value);
    
    if (error || (data !== null && data.length < 0)) {
      this.hasError = true;
    } else if (data && data.length > 0) {
      const formattedData = data[0] as Tables<'project'>;
      if (formattedData.image !== null) {
        const { data } = this.service.getImage(formattedData.image);
        
        if (data && data.publicUrl) {
          formattedData.image = data.publicUrl;
        }
      }
      

      if (formattedData.features !== null && formattedData.features.length > 0) {
        formattedData.features.map(feature => {
          if (feature.image !== null) {
            const { data } = this.service.getImage(feature.image);
          
            if (data && data.publicUrl) {
              feature.image = data.publicUrl;
            }
          }
        });
      }
      
      this.project = formattedData;
    }

    this.isLoading = false;

    this.service.getChanges().subscribe(update => {
      if (update !== null) {
        if (this.project === undefined || this.project === null) {
          return;
        }
        
        const newData = update.new;
        switch (update.eventType) {
          case UPDATE: {
            const project: Tables<'project'> = newData as Tables<'project'>;
              if (this.project.id === project.id) {
                if (project.image !== null) {
                  const { data } = this.service.getImage(project.image);
                  if (data !== null && data.publicUrl !== null) {
                    project.image = data.publicUrl;
                  }
                }

                if (project.features !== null && project.features.length > 0) {
                  project.features.map(feature => {
                    if (feature.image !== null) {
                      const { data } = this.service.getImage(feature.image);
                    
                      if (data && data.publicUrl) {
                        feature.image = data.publicUrl;
                      }
                    }
                  });
                }

                this.project = project;
                return;
              }
            break;
          }
        }
      }
    });
  }
}
