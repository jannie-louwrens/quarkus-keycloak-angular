import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from '../auth/app-auth.guard';
import { AuthModule } from '../auth/auth.module';
import { AlertComponent } from '../components/alert/alert.component';
import { CartComponent } from '../components/cart/cart.component';
import { CustomerOrdersComponent } from '../components/customer-orders/customer-orders.component';
import { CustomersComponent } from '../components/customers/customers.component';
import { HomeComponent } from '../components/home/home.component';
import { InventoryComponent } from '../components/inventory/inventory.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { ProductCatalogComponent } from '../components/product-catalog/product-catalog.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductComponent } from '../components/product/product.component';
import { ShopComponent } from '../components/shop/shop.component';
import { HttpErrorInterceptor } from '../interceptors/http-error.interceptor';
import { RemoveCommaPipe } from '../pipes/remove-comma.pipe';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'shop', component: ShopComponent, canActivate: [AppAuthGuard] },
      { path: 'cart', component: CartComponent, canActivate: [AppAuthGuard] },
      {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [AppAuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'customerorders/:username',
        component: CustomerOrdersComponent,
        canActivate: [AppAuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AppAuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [AppAuthGuard],
        data: { roles: ['admin'] },
      },
      { path: '', redirectTo: 'shop', pathMatch: 'full' },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    DecimalPipe,
    RemoveCommaPipe,
  ],
  exports: [RouterModule],
  declarations: [
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
})
export class ShopFeatureModule {}
