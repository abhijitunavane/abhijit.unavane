import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.css'
})
export class TypewriterComponent implements OnInit, OnDestroy {

  @Input()
  texts: string[] = [];
  protected text = '';
  private textsCounter = 0;

  ngOnInit(): void {
    this.writeText();
  }

  ngOnDestroy(): void {
      this.texts = [];
  }

  /**
   * Method to write text by one by one characters and later delete the text in the same way.
   */
  private writeText(): void {
    const word = this.texts.length ? this.texts[this.textsCounter].split('') : [];
    const loopTyping = () => {
      if (!this.texts.length) {
        return;
      }
      
      if (word.length > 0) {
        this.text += word.shift();
      } else {
        this.deleteText();
        return;
      }
      if (word.length === 0) {
        setTimeout(loopTyping, 2000);
      } else {
        setTimeout(loopTyping, 50);
      }
    };
    loopTyping();
  }

  /**
   * Method to delete text by one by one characters and later write the text in the same way.
   */
  private deleteText(): void {
    const word = this.texts.length ? this.texts[this.textsCounter].split('') : [];
    const loopDeleting = () => {
      if (!this.texts.length) {
        return;
      }

      if (word.length > 0) {
        word.pop();
        this.text = word.join('');
      } else {
        this.textsCounter = (this.textsCounter + 1) % this.texts.length;
        this.writeText();
        return;
      }
      setTimeout(loopDeleting, 50);
    };
    loopDeleting();
  }
}
