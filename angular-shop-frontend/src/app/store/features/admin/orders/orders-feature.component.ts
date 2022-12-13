import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderFacadeService } from './data-access/order-facade.service';

@Component({
  selector: 'app-orders',
  template: `
    <div *ngIf="pendingOrders$ | async as orders" class="container">
      <div *ngIf="!!orders && orders.length > 0">
        <h3 class="text-primary">Pending Orders</h3>
        <table class="table table-bordered table-hover table-sm">
          <thead class="bg-primary text-white">
            <tr>
              <th scope="col">Customers</th>
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col" class="text-center">Order Date</th>
              <th scope="col" class="text-end">Quantity</th>
              <th scope="col" class="text-end">Unit Price</th>
              <th scope="col" class="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td>{{ order.customerName }}</td>
              <td>{{ order.product }}</td>
              <td>{{ order.productCatalog }}</td>
              <td class="text-center">
                {{ order.orderDate | date : 'yyyy-MM-dd' }}
              </td>
              <td class="text-end">{{ order.quantity }}</td>
              <td class="text-end">
                {{ order.unitPrice | currency : 'ZAR' : 'symbol-narrow' }}
              </td>
              <td class="text-end">
                {{
                  order.quantity * order.unitPrice
                    | currency : 'ZAR' : 'symbol-narrow'
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class OrdersComponent {
  readonly pendingOrders$ = this.orderFacadeService.ordersWithCustomer$;

  constructor(private orderFacadeService: OrderFacadeService) {}
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OrdersComponent },
    ]),
  ],
  declarations: [OrdersComponent],
  providers: [OrderFacadeService],
})
export class OrdersFeatureModule {}
