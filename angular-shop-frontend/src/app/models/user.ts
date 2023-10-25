import { KeycloakProfile } from 'keycloak-js';

export interface User extends KeycloakProfile {
  isLoggedIn?: boolean | false;
  isAdministrator?: boolean | false;
}
