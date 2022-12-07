// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { KeycloakOptions } from 'keycloak-angular';
import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'demo',
  clientId: 'my-app',
};

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false,
};

const keycloakOptions: KeycloakOptions = {
  config: keycloakConfig,
  initOptions: keycloakInitOptions,
  enableBearerInterceptor: true,
  loadUserProfileAtStartUp: true,
};

export const environment = {
  production: false,
  keycloakOptions,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
