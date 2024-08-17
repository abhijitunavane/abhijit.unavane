import { Component, Input } from '@angular/core';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html'
})
export class ErrorCardComponent {

  faTriangleExclamation = faTriangleExclamation;
  
  @Input() isVisible: boolean = false;
}
