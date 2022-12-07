import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { AppAuthGuard } from './app-auth.guard';
import { AuthService } from './data-access/auth.service';

@NgModule({
  imports: [KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    AuthService,
    AppAuthGuard,
  ],
})
export class AuthModule {}

function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init(environment.keycloakOptions);
}
