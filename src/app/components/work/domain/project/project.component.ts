import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProjectService } from '../../../../services/work/domain/project/project.service';
import { Tables } from '../../../../types/database.types';
import { UPDATE } from '../../../../constants/superbase/superbase.tables.constant';
import { trigger, transition, style, animate } from '@angular/animations';
import { Status } from '../../../../services/common/status';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({  transform: 'translateY(1.2em)' }),
        animate('0.28s', style({ transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class ProjectComponent implements OnInit {
  project: Tables<'project'> | undefined
  status: Status = Status.LOADING;
  Status = Status;
  faGlobe = faGlobe
  faGithub = faGithub

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
      this.status = Status.ERROR;
    } else if (data && data.length > 0) {
      const formattedData = data[0] as Tables<'project'>;
      if (formattedData.image !== null) {
        const { data } = this.service.getImage(formattedData.image);
        
        if (data && data.publicUrl) {
          formattedData.image = data.publicUrl;
        }
      }
      this.status = Status.SUCCESS;

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
