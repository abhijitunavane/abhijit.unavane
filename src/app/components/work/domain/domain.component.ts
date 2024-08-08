import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomainService } from '../../../services/work/domain/domain.service';
import { Tables } from '../../../types/database.types';
import { ID, UPDATE } from '../../../constants/superbase/superbase.tables.constant';
import { ProjectService } from '../../../services/work/domain/project/project.service';
import { VisitorsService } from '../../../services/visitors/visitors.service';
import { ToastService } from '../../../services/toast/toast.service';
import { Severity } from '../../../types/common/toast/toast';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrl: './domain.component.css',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({  transform: 'translateY(1.2em)' }),
        animate('0.28s', style({ transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class DomainComponent implements OnInit {

  domain: Tables<'domain'> | null | undefined;
  isLoading: boolean = true;
  visitor: Tables<'visitors'> | null | undefined;
  selectedProject: Tables<'project'> | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private service: DomainService,
    private projectService: ProjectService,
    private visitorsService: VisitorsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      this.titleService.setTitle(`Abhijit Unavane • ${params.get('domain-id')}`);
      await this.setupObservers(params.get('domain-id'));
    });

    this.getVisitor();
  }

  async getVisitor(): Promise<void> {
    const visitorId = localStorage.getItem('visitorId');
    const {data, error} = await this.visitorsService.find(visitorId);
    if (error !== null && data === null) {
      return;
    }

    const visitors = data as Tables<'visitors'>[];
    if (visitors.length == 0) {
      return;
    }

    this.visitor = visitors[0];
  }

  getProjectUrl(domainId: string | null, projectId: string | null | undefined): string {
    if (domainId === null || projectId == null) {
      return "";
    }

    return `/work/${domainId}/${projectId}`;
  }

  async setupObservers(value: any): Promise<void> {
    const {data, error} = await this.service.find(value);

    this.isLoading = false;
    
    if (error || (data !== null && data.length < 0)) {
      this.toastService.add({
        text: "Something went wrong!",
        severity: Severity.ERROR
      });
    } else if (data && data.length > 0) {
      const formattedData = data[0] as Tables<'domain'>;
      if (formattedData.image !== null) {
        const { data } = this.service.getImage(formattedData.image);
        
        if (data && data.publicUrl) {
          formattedData.image = data.publicUrl;
        }
      }

      formattedData.projectList?.map(project => {
        if (project.image) {
          const { data } = this.projectService.getImage(project.image);
            
          if (data && data.publicUrl) {
            project.image = data.publicUrl;
          }
        }
      });
      
      this.domain = formattedData;
    }

    this.service.getChanges().subscribe(update => {
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
                  const { data } = this.service.getImage(domain.image);
                  if (data !== null && data.publicUrl !== null) {
                    domain.image = data.publicUrl;
                  }
                }
                domain.projectList?.map(project => {
                  if (project.image !== null) {
                    const { data } = this.service.getImage(project.image);
                      
                    if (data && data.publicUrl) {
                      project.image = data.publicUrl;
                    }
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

  async onLike(project: Tables<'project'>): Promise<void> {
    if (this.visitor) {
      if (!this.visitor.likes.includes(project.id)) {
        project.likes += 1;
        this.visitor.likes.push(project.id);
      } else if (project.likes !== 0) {
        project.likes -= 1;
        this.visitor.likes.splice(this.visitor.likes.indexOf(project.id), 1);
      }

      await this.service.update({"likes": project.likes}, ID, project.id);
      await this.visitorsService.update({"likes": this.visitor.likes}, ID, this.visitor.id);
    }
  }

  async onShare(project: Tables<'project'> | undefined | null): Promise<void> {
    if (!project) {
      return;
    }

    if (this.visitor) {
      this.toggleShareModal(project);
    }
  }

  async updateSharesCount(project: Tables<'project'> | undefined | null): Promise<void> {
    if (!project) {
      return;
    }

    if (this.visitor) {
      if (!this.visitor.shares.includes(project.id)) {
        project.shares += 1;
        this.visitor.shares.push(project.id);
      } else if (project.shares !== 0) {
        project.shares -= 1;
        this.visitor.shares.splice(this.visitor.shares.indexOf(project.id), 1);
      }

      await this.service.update({"shares": project.shares}, ID, project.id);
      await this.visitorsService.update({"shares": this.visitor.shares}, ID, this.visitor.id);
    }
  }

  isProjectLiked(project: Tables<'project'>): boolean {
    return this.visitor !== undefined && this.visitor !== null && this.visitor.likes.includes(project.id);
  }

  isProjectShared(project: Tables<'project'>): boolean {
    return this.visitor !== undefined && this.visitor !== null && this.visitor.shares.includes(project.id);
  }

  toggleShareModal(project: Tables<'project'> | null) {
    this.selectedProject = project;
  }

  getSharingText(): string {
    if (this.domain && this.selectedProject) {
      return `✨ Dive into Innovation: Explore ${this.selectedProject.name} ✨
${this.selectedProject.description}
🌐 Discover More: ${this.getProjectUrl(this.selectedProject.id, this.domain.id)}
💬 Join me: Share your thoughts and spread the word!
~ \#Abhijit_Unavane`;
    }

    return "";
  }
}
