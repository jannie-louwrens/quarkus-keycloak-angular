import { KeycloakProfile } from 'keycloak-js';
import { Order } from './order';
export interface Customer extends KeycloakProfile {
  orders?: Order[];
}
