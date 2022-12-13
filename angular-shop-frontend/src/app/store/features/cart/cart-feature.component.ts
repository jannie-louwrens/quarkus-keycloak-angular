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

  updateOrder(updatedOrder: Order): void {
    this.cartFacadeService.updateItem(updatedOrder);
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
