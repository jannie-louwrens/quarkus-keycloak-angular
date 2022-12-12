import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { Message } from './message';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private messageSource = new Subject<Message>();
  private keepAfterRouteChange = false;

  public readonly message$ = this.messageSource.asObservable();

  constructor(private router: Router) {
    // clear alert message on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single location change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.messageSource.next({ text: message, cssClass: 'alert alert-success' });
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.messageSource.next({ text: message, cssClass: 'alert alert-danger' });
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.messageSource.next(undefined as any as Message);
  }
}
