import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Tables } from '../../../../../types/database.types';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons/faCircleChevronLeft';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons/faCircleChevronRight';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { ToastService } from '../../../../../services/toast/toast.service';
import { Severity } from '../../../../../types/common/toast/toast';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrl: './share-modal.component.css'
})
export class ShareModalComponent {

  @ViewChild("brandList") brandList: ElementRef | undefined;
  @ViewChild("lastBrand") lastBrand: ElementRef | undefined;
  @Input() selectedProject: Tables<'project'> | undefined | null;
  @Input() sharingText: string | undefined | null;
  @Input() sharingUrl: string | undefined | null;
  @Output() toggleModal: EventEmitter<Tables<'project'> | undefined | null> = new EventEmitter();
  @Output() updateSharesCount: EventEmitter<Promise<void>> = new EventEmitter();
  showLeftArrow: boolean = false;
  showRightArrow: boolean = false;
  isShareUrlCopied: boolean = false;
  faFacebookSquare = faFacebookSquare;
  faLinkedin = faLinkedin;
  faXTwitter = faXTwitter;
  faWhatsapp = faWhatsapp;
  faCircleChevronLeft = faCircleChevronLeft;
  faCircleChevronRight = faCircleChevronRight;
  faXmark = faXmark;
  sharingOption = SharingOption

  constructor(private toastService: ToastService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'Escape' && event.type == 'keyup') {
      this.onToggleModal(null);
    }    
  }

  onToggleModal(project: Tables<'project'> | null) {
    this.toggleModal.emit(project);
  }

  getProjectUrl(domainId: string | null, projectId: string): string {
    if (domainId === null) {
      return "";
    }

    return `/work/${domainId}/${projectId}`;
  }

  copyLinkToClipboard(value: string | undefined | null): void {
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        this.toastService.add({
          text: "Link copied to clipboard",
          severity: Severity.SUCCESS
        });
      });
      this.updateSharesCount.emit();
    }
  }

  scrollBrandList(event: WheelEvent) {
    if (this.brandList) {
      this.brandList.nativeElement.scrollLeft += event.deltaY;
    }
  }

  scrollToStart() {
    if (!this.brandList) {
      return;
    }
  
    if (this.brandList.nativeElement.scrollLeft > 0) {
      this.brandList.nativeElement.scrollLeft -= 70;
    }
  }

  scrollToEnd() {
    if (!this.brandList) {
      return;
    }
  
    if (this.brandList.nativeElement.scrollLeft < this.brandList.nativeElement.scrollWidth) {
      this.brandList.nativeElement.scrollLeft += 60;
    }
  }

  scrollListener() {
    if (!this.brandList) {
      return;
    }

    const currentScroll = this.brandList.nativeElement.scrollLeft;
    const scrollLength = this.brandList.nativeElement.scrollWidth - this.brandList.nativeElement.clientWidth;
    if (currentScroll === 0) {
      this.showLeftArrow = false;
      this.showRightArrow = true;
    } else if (currentScroll === scrollLength) {
      this.showLeftArrow = false;
      this.showRightArrow = true;
    } else {
      this.showLeftArrow = true;
      this.showRightArrow = true;
    }
  }

  shareUrl(option: SharingOption) {
    const encodedSharingText = encodeURIComponent(this.sharingText ?? "");
    const encodedSharingUrl = encodeURIComponent(this.sharingUrl ?? "");
    switch (option) {
      case SharingOption.FACEBOOK: {
        window.open(`https://www.facebook.com/share_channel?link=${encodedSharingUrl}&source_surface=external_reshare&display=popup`);
        break;
      }
      case SharingOption.LINKEDIN: {
        window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodedSharingText}`);
        break;
      }
      case SharingOption.XTWITTER: {
        window.open(`https://www.x.com/intent/post?text=${encodedSharingText}`);
        break;
      }
      case SharingOption.WHATSAPPP: {
        window.open(`https://wa.me/?text=${encodedSharingText}`);
        break;
      }
    }

    this.updateSharesCount.emit();
  }
}

export enum SharingOption {
  FACEBOOK,
  LINKEDIN,
  WHATSAPPP,
  XTWITTER
}

export type SharingOptionType = typeof SharingOption;
