import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloakService: KeycloakService
  ) {
    super(router, keycloakService);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      // Force the user to log in if currently unauthenticated.
      if (!this.authenticated) {
        await this.keycloakService.login({
          redirectUri: window.location.origin + state.url,
        });
        return resolve(true);
      }

      // Get the roles required from the route.
      const requiredRoles = route.data['roles'];

      // Allow the user to to proceed if no additional roles are required to access the route.
      if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
        return resolve(true);
      }

      // Allow the user to proceed if all the required roles are present.
      return resolve(requiredRoles.every((role) => this.roles.includes(role)));
    });
  }
}
