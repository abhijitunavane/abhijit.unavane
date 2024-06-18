import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../../services/toast/toast.service';
import { Severity, Toast } from '../../../types/common/toast/toast';

@Component({
  selector: 'app-toast',
  animations: [
    trigger('closeAnimation', [
      transition(':enter', [
        style({  transform: 'translateY(10em)' }),
        animate('.5s', style({ transform: 'translateY(0em)' })),
      ]),
      transition(':leave', [
        style({  transform: 'translateY(0em)' }),
        animate('.3s', style({ transform: 'translateY(3em)', opacity: 0 })),
      ])
    ])
  ],
  template: `
  <div @closeAnimation *ngIf="this.toast" class="z-50 transition-all overflow-clip rounded-lg text-black w-max fixed left-2 md:left-8 bottom-2 md:bottom-8 bg-white">
    <div class="flex items-center space-x-4 p-1 md:p-2">
      <span class="text-sm md:text-xl select-none">{{this.toast.text}}</span>
      <fa-icon class="cursor-pointer" [icon]="this.faXmarkCircle" size="2x" title="Close" (click)="closeToast()"></fa-icon>
    </div>
    <div class="progress h-2" [ngClass]="getProgressColor()"></div>
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
    animation: progress 2s ease-in-out;
  }
  `
})
export class ToastComponent implements OnInit {

  @Input() text: string | undefined;
  @Input() isVisible: boolean = false;
  faXmarkCircle = faXmarkCircle;
  toast: Toast | null | undefined;

  getProgressColor(): string {
    if (this.toast) {
      switch(this.toast.severity) {
        case Severity.SUCCESS:
          return "bg-green-500"; 
        case Severity.ERROR: 
          return "bg-red-500";
        case Severity.WARNING: 
          return "bg-orange-500";
        default: 
          return "";
      }
    }

    return "";
  }

  constructor(private toastService: ToastService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.toastService.toastObserver.subscribe((newToast) => {
      this.toast = newToast;

      if (this.toast) {
        setTimeout(() => {
          this.closeToast();
        }, 2000);
      }
    });
  }

  closeToast() {
    this.toastService.clear();
    this.cd.markForCheck();
  }
}
