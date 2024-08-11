import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rounded-spinner',
  templateUrl: './rounded-spinner.component.html',
  styleUrl: './rounded-spinner.component.css',
  animations: [
    trigger('closeAnimation', [
      transition(':leave', [
        style({  transform: 'scale(1em)' }),
        animate('0.3s', style({ transform: 'scale(0)', opacity: 0})),
      ])
    ])
  ]
})
export class RoundedSpinnerComponent {

  @Input() isVisible: boolean = true;
  @Input() center: boolean = false;
}
