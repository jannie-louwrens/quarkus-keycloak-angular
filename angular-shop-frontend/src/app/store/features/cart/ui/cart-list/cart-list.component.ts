import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Order } from 'src/app/store/features/admin/orders/data-access/order';

@Component({
  selector: 'app-cart-list',
  template: `
    <div class="card border-primary">
      <div class="card-header text-white bg-primary">Shopping Cart</div>

      <div class="card-body">
        <div class="row px-2" *ngFor="let item of items; last as isLast">
          <app-cart-item
            [item]="item"
            (updateOrder)="updateOrder.emit($event)"
          ></app-cart-item>
          <hr class="mt-3" *ngIf="!isLast" />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponenet {
  @Input() items!: Order[] | null;
  @Output() updateOrder = new EventEmitter<Order>();
}
