import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { ProjectService } from '../../../services/work/domain/project/project.service';
import { Status } from '../../../services/common/status';
import { Tables } from '../../../types/database.types';

@Component({
  selector: 'app-search-work',
  templateUrl: './search-work.component.html',
  styleUrl: './search-work.component.css',
  animations: [
    trigger('close', [
      transition(':leave', [
        style({  opacity: '100%' }),
        animate('.2s', style({ opacity: 0})),
      ])
    ]),
    trigger('enter', [
      transition(':enter', [
        style({  transform: 'translateY(.8em)' }),
        animate('0.28s', style({ transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class SearchWorkComponent implements OnInit {

  isVisible: boolean = false;
  @Output() toggleDialog: EventEmitter<boolean> = new EventEmitter();
  faXmark = faXmark;
  faChevronRight = faChevronRight;
  searchValue: string = '';
  status: Status = Status.LOADING;
  Status = Status;
  projects: Tables<'project'>[] | undefined;
  focusedSearchResultIndex: number = -1;
  @ViewChildren('link') links!: QueryList<ElementRef>;
  @ViewChild('dialog') dialog!: ElementRef;
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('clearTextButton') clearTextButton!: ElementRef;

  constructor(private projectService : ProjectService) { }
  
  ngOnInit(): void {
    this.setup();
  }

  /**
   * Method to fetch all the projects data and setup the component
   */
  public async setup(): Promise<void> {
    const {data, error} = await this.projectService.get();
    if (error || (data !== null && data.length < 0)) {
      this.status = Status.ERROR;
    } else if (data && data.length > 0) {
      this.status = Status.SUCCESS;
      this.projects = data;
    }
  }

  /**
   * Method to open the dialog and to avoid background scrolling
   */
  open(): void {
    this.isVisible = true;
    setTimeout(() => this.focusInput(), 0); // Focus after rendering
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  /**
   * Method to close the dialog, enable background scrolling and reset the searchValue
   */
  close(): void {
    this.isVisible = false;
    document.body.style.overflow = 'auto'; // Restore background scroll
    this.searchValue = ""; // Empty the search query for upcoming dialog
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.onKeyEvent(event);
  }

  /**
   * Method to handle input
   * 1. Add focus like effect on first link
   * 2. Avoid link effect when input is not focused
   * 
   * @param event FocusEvent
   * @returns void
   */
  public onInput(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

  /**
   * Method to handle focus of dialog
   * 1. Avoid focus on background
   * 2. Focus on the link results and input using up-down array and default tab also.
   * 
   * @param event keyboardEvent
   * @returns void
   */
  public onKeyEvent(event: KeyboardEvent): void {
    const linkElements = this.links.toArray();
    if (!this.isVisible) {
      if (event.key === '/') {
        this.focusedSearchResultIndex = 0;
        this.open();
      }
      return;
    }

    const localName: string = (event.target as HTMLElement).localName;
    const isInput: boolean = localName === 'input';
    const isButton: boolean = localName === 'button';
    const lengthOfLinks: number = linkElements.length;

    if (event.key === 'ArrowDown') {
      this.focusedSearchResultIndex = isInput ? 0 : (this.focusedSearchResultIndex + 1) % lengthOfLinks; // Loop back to the first item
      this.focusLink(this.focusedSearchResultIndex);
    } else if (event.key === 'ArrowUp') {
      this.focusedSearchResultIndex = isInput ? lengthOfLinks - 1 : (this.focusedSearchResultIndex - 1 + lengthOfLinks) % lengthOfLinks; // Loop to the last item
      this.focusLink(this.focusedSearchResultIndex);
    } else if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'Tab') {
      if (isInput && event.shiftKey) {
        // prevent focus when shift+tab is pressed and focus is on input
        event.preventDefault();
        if (lengthOfLinks === 0) {
          this.clearTextButton.nativeElement.focus();
          return;
        }

        this.focusedSearchResultIndex = lengthOfLinks - 1;
        this.focusLink(this.focusedSearchResultIndex);
      } else if (!event.shiftKey) {
        if (this.focusedSearchResultIndex === lengthOfLinks - 1 && (event.target as HTMLElement).localName === 'a') {
          this.focusedSearchResultIndex = 0;
          this.focusInput();
          event.preventDefault();
        } else if (isButton && lengthOfLinks === 0) {
          /** focus input when 
           * 1. tab is pressed and focus is on last result and also length of links should be positive 
           * 2. target is clear text button
           */
          this.focusedSearchResultIndex = -1;
          this.focusInput();
          event.preventDefault();
        }
      }
    }
  }

  /**
   * Method to filter projects if project name starts with searchValue
   */
  public filteredProjects(): Tables<'project'>[] {
    return this.projects 
      ? this.projects.filter(project => project.name.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()))
      : [];
  }
  
  /**
   * Method to get focus on the link for the provided index
   * 
   * @param index index of link element which needs to be focused
   */
  private focusLink(index: number): void {
    const linkElements = this.links.toArray();
    if (linkElements[index]) {
      linkElements[index].nativeElement.focus();
    }
  }

  /**
   * Method to focus the input field
   */
  private focusInput(): void {
    if (this.inputField) {
      this.inputField.nativeElement.focus(); // Ensure input is focused
    }
  }
}
