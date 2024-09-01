import { Component, HostListener } from '@angular/core';
import { Link } from '../../utils/link';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('openClose', [
      state('open', style({
        visibility: 'visible'
      })),
      state('closed', style({
        visibility: 'hidden',
        opacity: 0,
      })),
      transition('open => closed', [animate('.2s')]),
  ])
]
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
      route: 'photography',
    },
  ];
  shouldShowMenu: boolean = false;
  shouldHighlightNavbar: boolean = false;

  menuClickListener() {
    this.shouldShowMenu = !this.shouldShowMenu;
  }

  closeMenu() {
    this.shouldShowMenu = false;
  }

  /**
   * Listener method to add background to navbar 
   * when scroll position is greater than 50
   */
  @HostListener('window:scroll', ['$event']) 
    highlightNavbar() {
      if (window.scrollY > 50) {
        this.shouldHighlightNavbar = true;
      } else {
        this.shouldHighlightNavbar = false;
      }
    }
}
