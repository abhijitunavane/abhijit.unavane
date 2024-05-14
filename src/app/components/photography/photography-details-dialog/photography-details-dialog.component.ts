import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Tables } from '../../../types/database.types';

@Component({
  selector: 'app-photography-details-dialog',
  templateUrl: './photography-details-dialog.component.html',
  styleUrl: './photography-details-dialog.component.css'
})
export class PhotographyDetailsDialogComponent {

  @Input() selectedPhoto: Tables<'photos'> | undefined | null;
  @Output() togglePhotoDialog: EventEmitter<Tables<'photos'> | undefined | null> = new EventEmitter();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'Escape' && event.type == 'keyup') {
      this.onTogglePhotoDialog(null);
    }    
  }

  onTogglePhotoDialog(photo: Tables<'photos'> | null) {
    this.togglePhotoDialog.emit(photo);
  }
}
