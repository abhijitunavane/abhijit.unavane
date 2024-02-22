import { Component } from '@angular/core';
import { Link } from '../../utils/link';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('openClose', [
      state('open', style({
        visibility: 'visible',        
      })),
      state('closed', style({
        visibility: 'hidden',
        opacity: 0,
        transform: 'scale(0.5)'
      })),
      transition('open => closed', [
        animate('0.3s ease-out'),
      ]),
      transition('closed => open', [
        animate('0.15s ease-in')
      ])
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
      route: '#',
    },
  ];
  shouldShowMenu: boolean = false;

  menuClickListener() {
    this.shouldShowMenu = !this.shouldShowMenu;
  }

  closeMenu() {
    this.shouldShowMenu = false;
  }
}
