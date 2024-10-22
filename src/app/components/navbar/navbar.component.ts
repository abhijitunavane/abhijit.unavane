import { Component, HostListener, ViewChild } from '@angular/core';
import { Link } from '../../utils/link';
import {
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';
import { SearchWorkComponent } from '../components';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger("slideInLeft", [
      transition(":enter", [
        style({
          transform: "translateX(-100%)"
        }),
        animate(
          "400ms ease",
          style({
            transform: "translateX(0)",
          })
        )
      ]),
      transition(":leave", [
        style({
          transform: "translateX(0)",
        }),
        animate(
          "300ms ease",
          style({
            transform: "translateX(-100%)"
          })
        )
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
      route: 'photography',
    },
  ];
  shouldShowMenu: boolean = false;
  shouldHighlightNavbar: boolean = false;
  faSearch = faSearch;
  @ViewChild(SearchWorkComponent) searchWorkComponent!: SearchWorkComponent;

  menuClickListener() {
    this.shouldShowMenu = !this.shouldShowMenu;
    if (this.shouldShowMenu) {
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
        document.body.style.overflow = 'auto'; // Restore background scroll
    }
  }

  closeMenu() {
    setTimeout(() => {
      this.shouldShowMenu = false;
      document.body.style.overflow = 'auto'; // Restore background scroll
    }, 250);
  }

  /**
   * Listener method to add background to navbar 
   * when scroll position is greater than 50
   */
  @HostListener('window:scroll', ['$event']) 
  public highlightNavbar() {
    if (window.scrollY > 50) {
      this.shouldHighlightNavbar = true;
    } else {
      this.shouldHighlightNavbar = false;
    }
  }
}
