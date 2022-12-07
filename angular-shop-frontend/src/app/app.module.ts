import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';

import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AlertComponent } from './components/alert/alert.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { RemoveCommaPipe } from './pipes/remove-comma.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    ShopComponent,
    ProductCatalogComponent,
    ProductComponent,
    CartComponent,
    OrdersComponent,
    CustomersComponent,
    CustomerOrdersComponent,
    NavBarComponent,
    InventoryComponent,
    ProductListComponent,
    RemoveCommaPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    KeycloakAngularModule,
  ],
  providers: [
    DecimalPipe,
    RemoveCommaPipe,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init(environment.keycloakOptions);
}
