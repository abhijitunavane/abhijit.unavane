import { Component, OnInit } from '@angular/core';
import { Photo, photosMock } from './photography.mock';
import { Title } from '@angular/platform-browser';
import RouteUtils from '../../utils/RouteUtil';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.css'
})
export class PhotographyComponent implements OnInit {
  
  photos: Photo[] | undefined;
  categoryRoute: string | undefined;

  constructor(private titleService: Title) {
    this.titleService.setTitle('Abhijit Unavane • Photography');
  }

  ngOnInit(): void {
    this.photos = photosMock;
  }

  getCategoryRoute(categoryId: number | undefined) {
    if (categoryId === undefined || categoryId === null) {
      return "";
    }

    return RouteUtils.createCategoryUrl(categoryId);
  }
}
