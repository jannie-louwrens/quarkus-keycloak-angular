import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { User } from '../models/user';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  userAction$ = this.userSubject.asObservable();

  constructor(private keycloakService: KeycloakService) { }

  public init = (): void => {
    if (this.keycloakService.isLoggedIn()) {
      from(this.keycloakService.loadUserProfile())
        .pipe(
          tap(customer => this.userSubject.next(customer)),
          map(()  => {
            this.userSubject.getValue().isLoggedIn = true;
            this.userSubject.getValue().isAdministrator = this.keycloakService.getUserRoles().some(role => role === 'admin');
          })
        ).subscribe();
    }
  }

  public logout = async (): Promise<void> => {
    await this.keycloakService.logout();
    this.userSubject.next(undefined);
  }

}
