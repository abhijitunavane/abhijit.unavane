import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Tables } from '../../../types/database.types';
import { PhotosService } from '../../../services/photos/photos.service';
import { UPDATE } from '../../../constants/superbase/superbase.tables.constant';

@Component({
  selector: 'app-photography-category',
  templateUrl: './photography-category.component.html',
  styleUrls: ['./photography-category.component.css', '../photography.component.css']
})
export class PhotographyCategoryComponent implements OnInit {

  photosByCategory: Tables<'photos'>[] | undefined;
  selectedPhoto?: Tables<'photos'> | null;
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(private route: ActivatedRoute, private titleService: Title, private service: PhotosService) {
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
    if (photo === null) {
      this.selectedPhoto = null;
    } else {
      this.selectedPhoto = photo;
    }
  }

  async setupObservers(categoryId: string): Promise<void> {
    const {data, error} = await this.service.find(categoryId);
    this.isLoading = true;
    
    if (error || (data !== null && data.length < 0)) {
      this.hasError = true;
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
            var newPhotos = this.photosByCategory;
            var index = this.photosByCategory.findIndex(photo => updatedPhoto.id === photo.id);
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
