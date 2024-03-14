import { Component, OnInit } from '@angular/core';
import { Photo, photosMock, photosWithCategoryMock } from './photography.mock';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.css'
})
export class PhotographyComponent implements OnInit {
  
  photos: Photo[] | undefined;
  selectedPhoto?: Photo | null;

  constructor(private titleService: Title) {
    this.titleService.setTitle('Abhijit Unavane • Photography');
  }

  ngOnInit(): void {
    this.photos = photosMock;
  }

  togglePhotoDialog(photo: Photo | null) {
    if (photo === null) {
      this.selectedPhoto = null;
    } else {
      this.selectedPhoto = photo;
    }
  }
}
