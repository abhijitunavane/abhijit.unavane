import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square-spinner',
  template: `
  <div *ngIf="isLoading" class="flex justify-center pt-10 relative">
      <div class="h-8 w-8 ring-2 rounded-sm ring-white absolute animate-spin" style="animation-duration: 2s"></div>
  </div>
  `
})
export class SquareSpinnerComponent {
  
  @Input() isLoading: boolean = true;
}
