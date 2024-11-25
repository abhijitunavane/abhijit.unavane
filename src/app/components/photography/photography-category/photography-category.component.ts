import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Tables } from '../../../types/database.types';
import { PhotosService } from '../../../services/photos/photos.service';
import { UPDATE } from '../../../constants/superbase/superbase.tables.constant';
import { ToastService } from '../../../services/toast/toast.service';
import { Severity } from '../../../types/common/toast/toast';
import { trigger, transition, style, animate } from '@angular/animations';
import { Status } from '../../../services/common/status';
import RouteUtil from '../../../utils/route.util';

@Component({
  selector: 'app-photography-category',
  templateUrl: './photography-category.component.html',
  styleUrls: ['./photography-category.component.css', '../photography.component.css'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({  transform: 'translateY(1.2em)' }),
        animate('0.28s', style({ transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class PhotographyCategoryComponent implements OnInit {

  photosByCategory: Tables<'photos'>[] | undefined;
  selectedPhoto?: Tables<'photos'> | null;
  nextCategory: string | undefined;
  status: Status = Status.LOADING;
  Status = Status;

  constructor(
    private route: ActivatedRoute, 
    private titleService: Title, 
    private service: PhotosService,
    private toastService: ToastService) {
    this.titleService.setTitle('Abhijit Unavane • Photography');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const categoryId = params.get('category-id');
      if (categoryId !== null) {
        this.setupObservers(categoryId); 
      }
    });
  }

  getCategoryRoute(categoryId: string | null | undefined) {
    if (categoryId === undefined || categoryId === null) {
      return undefined;
    }

    return RouteUtil.createCategoryUrl(categoryId);
  }

  togglePhotoDialog(photo: Tables<'photos'> | null) {
    if (photo) {
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'auto'; // Restore background scroll
    }

    this.selectedPhoto = photo;
  }

  async setupObservers(categoryId: string): Promise<void> {
    const {data, error} = await this.service.find(categoryId);
    if (error || (data !== null && data.length < 0)) {
      this.status = Status.ERROR;
      this.toastService.add({
        text: "Something went wrong!",
        severity: Severity.ERROR
      });
    } else if (data && data.length > 0) {
      const formattedData = data as Tables<'photos'>[];
      formattedData.map(photo => {
        if (photo.image !== null) {
          const { data } = this.service.getImageByCategoryId(photo.image, photo.categoryId);
          this.nextCategory = photo.nextCategoryId;
            
          if (data && data.publicUrl) {
            photo.image = data.publicUrl;
          }
        }
      });
      this.photosByCategory = formattedData;
      this.status = Status.SUCCESS;
    }

    this.service.getChanges().subscribe(update => {
      if (update !== null) {
        if (this.photosByCategory === undefined || this.photosByCategory === null) {
          return;
        }
        
        const newData = update.new;
        switch (update.eventType) {
          case UPDATE: {
            const updatedPhoto: Tables<'photos'> = newData as Tables<'photos'>;
            const index = this.photosByCategory.findIndex(photo => updatedPhoto.id === photo.id);
            if (index !== -1) {
              if (updatedPhoto.image !== null) {
                const { data } = this.service.getImageByCategoryId(updatedPhoto.image, updatedPhoto.categoryId);
                  
                if (data && data.publicUrl) {
                  updatedPhoto.image = data.publicUrl;
                }
              }
              this.photosByCategory[index] = updatedPhoto;
            }
            break;
          }
        }
      }
    });
  }
}
