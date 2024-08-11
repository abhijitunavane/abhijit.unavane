import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import RouteUtil from '../../utils/route.util';
import { PhotosService } from '../../services/photos/photos.service';
import { Tables } from '../../types/database.types';
import { UPDATE } from '../../constants/superbase/superbase.tables.constant';
import { ToastService } from '../../services/toast/toast.service';
import { Severity } from '../../types/common/toast/toast';
import { trigger, transition, style, animate } from '@angular/animations';
import { Status } from '../../services/common/status';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.css',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({  transform: 'translateY(1.2em)' }),
        animate('0.28s', style({ transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class PhotographyComponent implements OnInit {
  
  photos: Tables<'photos'>[] | null | undefined;
  status: Status = Status.LOADING;
  Status = Status;
  categoryRoute: string | undefined;

  constructor(private titleService: Title, private service: PhotosService, private toastService: ToastService) {
    this.titleService.setTitle('Abhijit Unavane • Photography');
  }

  ngOnInit(): void {
    this.setupObservers();
  }

  getCategoryRoute(categoryId: string | null | undefined) {
    if (categoryId === undefined || categoryId === null) {
      return "";
    }

    return RouteUtil.createCategoryUrl(categoryId);
  }

  async setupObservers(): Promise<void> {
    const {data, error} = await this.service.get();
    if (error || (data !== null && data.length < 0)) {
      this.status = Status.ERROR;
      this.toastService.add({
        "text": "Something went wrong!",
        severity: Severity.ERROR
      });
    } else if (data && data.length > 0) {
      this.photos = data;
      this.status = Status.SUCCESS;
    }

    this.service.getChanges().subscribe(update => {
      if (update !== null) {
        if (this.photos === undefined || this.photos === null) {
          return;
        }
        
        const newData = update.new;
        switch (update.eventType) {
          case UPDATE: {
            const updatedPhoto: Tables<'photos'> = newData as Tables<'photos'>;
            const newPhotos = this.photos;
            const index = this.photos.findIndex(photo => updatedPhoto.id === photo.id);
            if (index !== -1) {
              newPhotos[index] = updatedPhoto;
              this.photos = newPhotos;
            }
            break;
          }
        }
      }
    });
  }
}
