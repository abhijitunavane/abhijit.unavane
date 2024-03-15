import { Component } from '@angular/core';
import { Photo, photosMock } from '../photography.mock';
import { Title } from '@angular/platform-browser';
import { PhotographyCategory, photographyCategoryListMock } from './photography-category.mock';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-photography-category',
  templateUrl: './photography-category.component.html',
  styleUrls: ['./photography-category.component.css', '../photography.component.css']
})
export class PhotographyCategoryComponent {

  category: PhotographyCategory | undefined;
  selectedPhoto?: Photo | null;

  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('Abhijit Unavane • Photography');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const categoryId = Number(params.get('category-id'));
      this.category = photographyCategoryListMock.filter(category => category.id === categoryId)[0];
    });
  }

  togglePhotoDialog(photo: Photo | null) {
    if (photo === null) {
      this.selectedPhoto = null;
    } else {
      this.selectedPhoto = photo;
    }
  }
}
