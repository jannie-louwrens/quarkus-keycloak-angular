import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/store/features/admin/orders/data-access/order';

@Component({
  selector: 'app-cart-item',
  template: `
    <div class="row align-items-end">
      <div class="col">
        <div class="row">
          {{ item?.product }}
        </div>
      </div>
      <div class="col">
        <span
          ><button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            [disabled]="item?.quantity === 1"
            (click)="onDecreaseQuantity(item!)"
          >
            <i class="bi bi-dash-lg"></i></button
        ></span>
        <span class="mx-2">{{ item?.quantity }}</span>
        <span
          ><button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            (click)="onIncreaseQuantity(item!)"
          >
            <i class="bi bi-plus-lg"></i></button
        ></span>
      </div>
      <div class="col">
        {{ item?.unitPrice | currency : 'ZAR' : 'symbol-narrow' }}
      </div>
      <div class="col">
        {{
          item!.quantity * item!.unitPrice | currency : 'ZAR' : 'symbol-narrow'
        }}
      </div>
    </div>
    <div class="row fw-lighter">
      <small class="p-0">{{ item?.productCatalog }}</small>
    </div>
  `,
})
export class CartItemComponent {
  @Input() item!: Order | null;
  @Output() updateOrder = new EventEmitter<Order>();

  onDecreaseQuantity(order: Order): void {
    const updatedOrder = { ...order, quantity: --order.quantity };
    this.updateOrder.emit(updatedOrder);
  }

  onIncreaseQuantity(order: Order): void {
    const updatedOrder = { ...order, quantity: ++order.quantity };
    this.updateOrder.emit(updatedOrder);
  }
}
