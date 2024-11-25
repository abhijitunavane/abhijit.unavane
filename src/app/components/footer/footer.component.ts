import { Component } from '@angular/core';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons/faInstagramSquare';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';
import { faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  links = [
    {
      route: "https://read.cv/",
      type: "CV"
    },
    {
      route: "https://www.linkedin.com/in/abhijitunavane/",
      type: "LinkedIn"
    },
    {
      route: "https://github.com/abhijitunavane",
      type: "Github"
    },
    {
      route: "https://www.instagram.com/abhijitunavane/",
      type: "Instagram"
    },
    {
      route: "https://x.com/abhiunavane",
      type: "X"
    },
    {
      route: "mailto:abhijit.unavane@gmail.com",
      type: "Email"
    },
    {
      route: "https://www.instagram.com/shotby.abhi/",
      type: "Photography"
    },
  ];

  getLinkIcon(type: string) {
    switch(type) {
      case 'CV': return faFileLines;
      case 'Github': return faGithubSquare;
      case 'Instagram': return faInstagramSquare;
      case 'Photography': return faInstagramSquare;
      case 'LinkedIn': return faLinkedin;
      case 'Email': return faEnvelope;
      default: return faXTwitter;
    }
  }
}
