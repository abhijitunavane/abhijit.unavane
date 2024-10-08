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
      route: "https://read.cv/"
    },
    {
      label: "Github",
      route: "https://github.com/abhijitunavane"
    },
    {
      label: "LinkedIn",
      route: "https://www.linkedin.com/in/abhijitunavane/"
    },
  ];
  contact : Link[] = [
    {
      label: "Message",
      route: "mailto:abhijit.unavane@gmail.com"
    }
  ]
}
