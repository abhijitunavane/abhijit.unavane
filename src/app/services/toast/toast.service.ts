import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../../types/common/toast/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSource = new Subject<Toast | null | undefined>();
  public toastObserver = this.toastSource.asObservable();

  constructor() { }

  add(toast: Toast | undefined) {
    if (toast) {
      this.toastSource.next(toast);
    }
  }

  clear() {
    this.toastSource.next(null);
  }
}
