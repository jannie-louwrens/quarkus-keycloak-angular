import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/auth/app-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers-feature.module').then(
            (m) => m.CustomersFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders-feature.component').then(
            (m) => m.OrdersFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./inventory/inventory-feature.module').then(
            (m) => m.InventoryFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ['admin'] },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminFeatureModule {}
