import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
  <div *ngIf="showToast" class="text-black w-max fixed left-2 md:left-8 bottom-2 md:bottom-8">
    <div class="bg-white">
      <div class="flex items-center space-x-4  p-1 md:p-2">
      <span class="text-sm md:text-xl">{{text}}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-button-white w-9 stroke-2" (click)="closeToast()">
            <line x1="19" y1="5" x2="5" y2="19" fill="#fff" stroke="#000" stroke-miterlimit="10" />
            <line x1="5" y1="5" x2="19" y2="19" fill="#fff" stroke="#000" stroke-miterlimit="10" />
        </svg>
      </div>
    </div>
    <div class="progress h-2 bg-red-500"></div>
  </div>
  `,
  styles: `
  @keyframes progress {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  .progress {
    animation: progress 1s ease-in-out;
  }
  `
})
export class ToastComponent implements OnInit {

  @Input() text: String | undefined;
  showToast: boolean = true;

  ngOnInit(): void {
    this.setTimerToCloseToast();
  }

  setTimerToCloseToast() {
    setTimeout(() => this.closeToast(), 1000);
  }

  closeToast() {
    this.showToast = false;
  }
}
