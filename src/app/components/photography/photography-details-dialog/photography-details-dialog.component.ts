import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Photo } from '../photography.mock';

@Component({
  selector: 'app-photography-details-dialog',
  templateUrl: './photography-details-dialog.component.html',
  styleUrl: './photography-details-dialog.component.css'
})
export class PhotographyDetailsDialogComponent {

  @Input() selectedPhoto: Photo | undefined | null;
  @Output() togglePhotoDialog: EventEmitter<Photo | undefined | null> = new EventEmitter();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'Escape' && event.type == 'keyup') {
      this.onTogglePhotoDialog(null);
    }    
  }

  onTogglePhotoDialog(photo: Photo | null) {
    this.togglePhotoDialog.emit(photo);
  }
}
