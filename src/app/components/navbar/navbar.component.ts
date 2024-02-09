import { Component, HostListener } from '@angular/core';
import { Link } from '../../utils/link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navs: Link[] = [
    {
      label: 'Work',
      route: 'work',
    },
    {
      label: 'About',
      route: 'about',
    },
    {
      label: 'Photography',
      route: '#',
    },
  ];
  dialogShown: boolean = false;

  @HostListener("click")
  showOrCloseDialog() {
    this.dialogShown = !this.dialogShown;
    
  }
}
