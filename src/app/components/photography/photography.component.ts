import { Component, OnInit } from '@angular/core';
import { photosMock, Photo } from './photography.mock';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.css'
})
export class PhotographyComponent implements OnInit {
  
  photos: Photo[] | undefined;
  selectedPhoto?: Photo | null = photosMock[0];

  constructor(private titleService: Title) {
    titleService.setTitle('Abhijit Unavane • Photography');
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
