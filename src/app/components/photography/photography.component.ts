import { Component, OnInit } from '@angular/core';
import { Photo, photosMock } from './photography.mock';
import { Title } from '@angular/platform-browser';
import RouteUtil from '../../utils/route.util';
import { PhotosService } from '../../services/photos/photos.service';
import { Tables } from '../../types/database.types';
import { UPDATE } from '../../constants/superbase/superbase.tables.constant';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.css'
})
export class PhotographyComponent implements OnInit {
  
  photos: Tables<'photos'>[] | undefined;
  hasError: boolean = false;
  isLoading: boolean = true;
  categoryRoute: string | undefined;

  constructor(private titleService: Title, private service: PhotosService) {
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
    this.isLoading = true;
    
    if (error || (data !== null && data.length < 0)) {
      this.hasError = true;
    } else if (data && data.length > 0) {
      this.photos = data;
    }

    this.isLoading = false;

    this.service.getChanges().subscribe(update => {
      if (update !== null) {
        if (this.photos === undefined || this.photos === null) {
          return;
        }
        
        const newData = update.new;
        switch (update.eventType) {
          case UPDATE: {
            const updatedPhoto: Tables<'photos'> = newData as Tables<'photos'>;
            var newPhotos = this.photos;
            var index = this.photos.findIndex(photo => updatedPhoto.id === photo.id);
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
