import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from 'src/app/store/features/admin/orders/data-access/order';

@Component({
  selector: 'app-cart-total',
  template: `
    <div class="card border-primary" *ngIf="items?.length; else noItems">
      <div class="card-header text-white bg-primary fw-bold">Cart Total</div>

      <div class="card-body">
        <div class="row">
          <div class="col-md-4">Items:</div>
          <div class="col-md-8  text-end">
            {{ calcItems(items!) }}
          </div>
        </div>

        <div class="row">
          <div class="col-md-4"><b>Total:</b></div>
          <div class="col-md-8 text-end">
            <b>{{ calcTotal(items!) | currency : 'ZAR' : 'symbol-narrow' }}</b>
          </div>
        </div>
      </div>
    </div>

    <ng-template #noItems>
      <div
        class="alert alert-info d-flex align-items-center border border-info py-0"
        role="alert"
      >
        <i class="bi bi-info-circle" style="font-size: 2rem"></i>
        <div class="ms-3">No items in cart.</div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTotalComponent {
  @Input() items!: Order[] | null;

  calcItems(orders: Order[]): number {
    return orders.reduce((tally, order) => tally + order.quantity, 0);
  }

  calcTotal(orders: Order[]): number {
    return orders.reduce(
      (tally, order) => tally + order.quantity * order.unitPrice,
      0
    );
  }
}
