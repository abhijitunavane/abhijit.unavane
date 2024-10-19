import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Tables } from '../../../types/database.types';
import { faInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { animate, style, transition, trigger } from '@angular/animations';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-photography-details-dialog',
  templateUrl: './photography-details-dialog.component.html',
  styleUrl: './photography-details-dialog.component.css',
  animations: [
    trigger("slideInLeft", [
      transition(":enter", [
        style({
          transform: "translateX(100%)"
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
            transform: "translateX(100%)"
          })
        )
      ])
    ])
  ]
})
export class PhotographyDetailsDialogComponent {

  @Input() selectedPhoto: Tables<'photos'> | undefined | null;
  @Output() togglePhotoDialog: EventEmitter<Tables<'photos'> | undefined | null> = new EventEmitter();
  faXmark = faXmark;
  faInfo = faInfo;
  faCircle = faCircle;
  faInstagram = faInstagram;
  shouldDisplayInfo: boolean = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'Escape' && event.type == 'keyup') {
      this.onTogglePhotoDialog(null);
      this.shouldDisplayInfo = false;
    }    
  }

  onTogglePhotoDialog(photo: Tables<'photos'> | null) {
    if (!photo) {
      this.shouldDisplayInfo = false;
    }
    this.togglePhotoDialog.emit(photo);
  }
}
