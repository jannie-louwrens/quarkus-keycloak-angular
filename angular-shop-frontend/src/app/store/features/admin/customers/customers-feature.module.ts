import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFacadeService } from './data-access/customer-facade.service';
import { CustomerInfo } from './data-access/customer-info';

@Component({
  selector: 'app-customers',
  template: `
    <div *ngIf="customers$ | async as customers">
      <table class="table table-bordered">
        <thead class="bg-primary text-white">
          <tr>
            <th scope="col"></th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Orders</th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngFor="let customer of customers">
            <tr
              (click)="
                selectedCustomer === customer
                  ? (selectedCustomer = null)
                  : (selectedCustomer = customer)
              "
              [ngClass]="{
                'table-active': selectedCustomer === customer
              }"
            >
              <th scope="row">
                <i
                  class="bi bi-chevron-down"
                  *ngIf="selectedCustomer !== customer"
                ></i>
                <i
                  class="bi bi-chevron-right"
                  *ngIf="selectedCustomer === customer"
                ></i>
              </th>
              <td>{{ customer.firstName }}</td>
              <td>{{ customer.lastName }}</td>
              <td>{{ customer.orders?.length }} Orders</td>
            </tr>

            <ng-container *ngIf="selectedCustomer === customer">
              <tr [ngbCollapse]="!selectedCustomer">
                <td
                  colspan="4"
                  (click)="selectedCustomer = null"
                  class="text-center"
                >
                  <ng-container
                    *ngIf="
                      customer.orders && customer.orders.length > 0;
                      else elseNoOrders
                    "
                  >
                    <table class="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col" class="w-25">Product</th>
                          <th scope="col" class="w-25">Product Catalog</th>
                          <th
                            scope="col"
                            class="text-center"
                            style="width:100px;"
                          >
                            Date
                          </th>
                          <th scope="col" class="text-end" style="width:100px;">
                            Unit Price
                          </th>
                          <th scope="col" class="text-end" style="width:100px;">
                            Quantity
                          </th>
                          <th scope="col" class="text-end" style="width:100px;">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody class="table-group-divider">
                        <tr *ngFor="let order of customer.orders">
                          <td>{{ order.product }}</td>
                          <td>{{ order.productCatalog }}</td>
                          <td class="text-center">
                            {{ order.orderDate | date : 'yyyy-MM-dd' }}
                          </td>
                          <td class="text-end">
                            {{
                              order.unitPrice
                                | currency : 'ZAR' : 'symbol-narrow'
                            }}
                          </td>
                          <td class="text-end">{{ order.quantity }}</td>
                          <td class="text-end">
                            {{
                              order.quantity * order.unitPrice
                                | currency : 'ZAR' : 'symbol-narrow'
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table> </ng-container
                  ><ng-template #elseNoOrders>
                    <div
                      class="alert alert-info d-flex align-items-center border border-info py-0"
                      role="alert"
                    >
                      <i class="bi bi-info-circle" style="font-size: 2rem"></i>
                      <div class="ms-3">Customer has no pending orders.</div>
                    </div>
                  </ng-template>
                </td>
              </tr>
            </ng-container>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
})
export class CustomersComponent {
  selectedCustomer!: CustomerInfo | null;
  readonly customers$ = this.customerFacadeService.customersWithOrders$;

  constructor(private customerFacadeService: CustomerFacadeService) {}
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: CustomersComponent },
    ]),
    NgbCollapseModule,
  ],
  declarations: [CustomersComponent],
  providers: [CustomerFacadeService],
})
export class CustomersFeatureModule {}
