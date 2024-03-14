import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from '../photography.mock';

@Component({
  selector: 'app-photography-details-dialog',
  templateUrl: './photography-details-dialog.component.html',
  styleUrl: './photography-details-dialog.component.css'
})
export class PhotographyDetailsDialogComponent {

  @Input() selectedPhoto: Photo | undefined | null;
  @Output() togglePhotoDialog: EventEmitter<Photo | undefined | null> = new EventEmitter();


  onTogglePhotoDialog(photo: Photo | null) {
    this.togglePhotoDialog.emit(photo);
  }
}
