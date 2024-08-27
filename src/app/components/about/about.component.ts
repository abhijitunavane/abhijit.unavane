import { AfterViewInit, Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AboutService } from '../../services/about/about.service';
import { Tables } from '../../types/database.types';
import { INSERT, UPDATE } from '../../constants/superbase/superbase.tables.constant';
import { ToastService } from '../../services/toast/toast.service';
import { Severity } from '../../types/common/toast/toast';
import { animate, style, transition, trigger } from '@angular/animations';
import { Status } from '../../services/common/status';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({  transform: 'translateY(1.2em)' }),
        animate('0.28s', style({ transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {

  protected aboutList: Tables<'about'>[] | null | undefined;
  protected status: Status = Status.LOADING;
  protected Status = Status;

  constructor(private titleService: Title, private service: AboutService, private toastService: ToastService) {
    this.titleService.setTitle('Abhijit Unavane • About');
  }
  
  ngOnInit() {
    this.setupObservers();
  }

  private async setupObservers(): Promise<void> {
    const {data, error} = await this.service.get();
    if (error !== null) {
      this.status = Status.ERROR;
      this.toastService.add({
        "text": "Something went wrong!",
        severity: Severity.ERROR
      });
    } else if (data !== null) {
      this.status = Status.SUCCESS;
      this.aboutList = data;
      this.aboutList?.map(async about => {
        if (about.image !== null) {
          const { data } = this.service.getImage(about.image);
          
          if (data !== null && data.publicUrl !== null) {
            about.image = data.publicUrl;
          }         
        }
      });
    }
    
    this.service.getChanges().subscribe(update => {
      if (update !== null) {
        if (this.aboutList === undefined || this.aboutList === null) {
          return;
        }
        
        const newData = update.new;
        switch (update.eventType) {
          case INSERT: {
            const about: Tables<'about'> = newData as Tables<'about'>;
            if (about.image !== null) {
              const { data } = this.service.getImage(about.image);
              if (data !== null && data.publicUrl !== null) {
                about.image = data.publicUrl;
              }
            }
            this.aboutList.push(about);
            break;
          }
          case UPDATE: {
            if (this.aboutList.length > 0) {
              this.aboutList.map((about, index) => {
                if (about.id === newData.id) {
                  const about: Tables<'about'> = newData as Tables<'about'>;
                  if (about.image !== null) {
                    const { data } = this.service.getImage(about.image);
                    if (data !== null && data.publicUrl !== null) {
                      about.image = data.publicUrl;
                    }
                  }
                  this.aboutList![index] = about;
                  return;
                }
              });
            }
            break;
          }
        }
      }
    });
  }
}
