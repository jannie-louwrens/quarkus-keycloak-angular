import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Order } from '../admin/orders/data-access/order';
import { RouterModule } from '@angular/router';
import { CartFacadeService } from './data-access/cart-facade.service';
import { CartListComponenet } from './ui/cart-list/cart-list.component';
import { CartTotalComponent } from './ui/cart-total/cart-total.component';
import { CartItemComponent } from './ui/cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  template: `
    <div class="row">
      <div class="col-md-8">
        <app-cart-list
          [items]="itemsInCart$ | async"
          (updateOrder)="updateOrder($event)"
        ></app-cart-list>
      </div>
      <div class="col-md-4">
        <app-cart-total [items]="itemsInCart$ | async"></app-cart-total>
      </div>
    </div>
  `,
})
export class CartComponent {
  itemsInCart$ = this.cartFacadeService.cartWithCRUD$;

  onDeleteOrder(order: Order): void {
    console.log(
      '🚀 ~ file: cart-feature.component.ts:20 ~ CartComponent ~ onDeleteOrder ~ method not implemented'
    );
  }

  updateOrder(updatedOrder: Order): void {
    this.cartFacadeService.updateItem(updatedOrder);
  }

  onIncreaseQuantity(order: Order): void {
    const updatedOrder = { ...order, quantity: ++order.quantity };
    this.cartFacadeService.updateItem(updatedOrder);
  }

  calcItems(orders: Order[]): number {
    return orders.reduce((tally, order) => tally + order.quantity, 0);
  }

  calcTotal(orders: Order[]): number {
    return orders.reduce(
      (tally, order) => tally + order.quantity * order.unitPrice,
      0
    );
  }

  constructor(private cartFacadeService: CartFacadeService) {}
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: CartComponent },
    ]),
  ],
  declarations: [
    CartComponent,
    CartListComponenet,
    CartItemComponent,
    CartTotalComponent,
  ],
})
export class CartFeatureModule {}
