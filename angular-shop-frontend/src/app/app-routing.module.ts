import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ShopComponent } from './components/shop/shop.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { AppAuthGuard } from './app-auth.guard';
import { InventoryComponent } from './components/inventory/inventory.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'shop', component: ShopComponent, canActivate: [AppAuthGuard] },
      { path: 'cart', component: CartComponent, canActivate: [AppAuthGuard] },
      { path: 'customers', component: CustomersComponent, canActivate: [AppAuthGuard], data: { roles: ['admin'] } },
      { path: 'customerorders/:username', component: CustomerOrdersComponent, canActivate: [AppAuthGuard], data: { roles: ['admin'] } },
      { path: 'orders', component: OrdersComponent, canActivate: [AppAuthGuard], data: { roles: ['admin'] } },
      { path: 'inventory', component: InventoryComponent, canActivate: [AppAuthGuard], data: { roles: ['admin'] } },
      { path: '', redirectTo: 'shop', pathMatch: 'full'}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
