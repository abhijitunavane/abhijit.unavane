import { Component } from '@angular/core';
import { Link } from '../../utils/link';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  elseWhere : Link[] = [
    {
      label: "CV",
      route: "#"
    },
    {
      label: "Github",
      route: "#"
    },
    {
      label: "LinkedIn",
      route: "#"
    },
  ];
  contact : Link[] = [
    {
      label: "Message",
      route: "#"
    }
  ]
}
