import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Tables } from '../../../types/database.types';
import { PhotosService } from '../../../services/photos/photos.service';
import { UPDATE } from '../../../constants/superbase/superbase.tables.constant';
import { ToastService } from '../../../services/toast/toast.service';
import { Severity } from '../../../types/common/toast/toast';
import { trigger, transition, style, animate } from '@angular/animations';

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
  isLoading: boolean = true;
  hasError: boolean = false;

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

  togglePhotoDialog(photo: Tables<'photos'> | null) {
    this.selectedPhoto = photo;
  }

  async setupObservers(categoryId: string): Promise<void> {
    const {data, error} = await this.service.find(categoryId);
    this.isLoading = true;
    
    if (error || (data !== null && data.length < 0)) {
      this.toastService.add({
        text: "Something went wrong!",
        severity: Severity.ERROR
      });
    } else if (data && data.length > 0) {
      this.photosByCategory = data;
    }

    this.isLoading = false;

    this.service.getChanges().subscribe(update => {
      if (update !== null) {
        if (this.photosByCategory === undefined || this.photosByCategory === null) {
          return;
        }
        
        const newData = update.new;
        switch (update.eventType) {
          case UPDATE: {
            const updatedPhoto: Tables<'photos'> = newData as Tables<'photos'>;
            const newPhotos = this.photosByCategory;
            const index = this.photosByCategory.findIndex(photo => updatedPhoto.id === photo.id);
            if (index !== -1) {
              newPhotos[index] = updatedPhoto;
              this.photosByCategory = newPhotos;
            }
            break;
          }
        }
      }
    });
  }
}
