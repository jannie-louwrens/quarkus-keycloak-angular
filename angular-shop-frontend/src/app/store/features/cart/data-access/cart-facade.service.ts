import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  lastValueFrom,
  map,
  merge,
  Observable,
  of,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/auth/data-access/auth.service';
import { CrudAction } from 'src/app/shared/crud-action';
import { Order } from '../../admin/orders/data-access/order';
import { OrderService } from '../../admin/orders/data-access/order.service';
import { AlertService } from '../../../data-access/alert.service';
import { Product } from '../../admin/inventory/data-access/product';

@Injectable({ providedIn: 'root' })
export class CartFacadeService {
  private emptyItem!: Order;

  private cartSubject = new BehaviorSubject<Order[]>([]);
  private cart$ = this.cartSubject.asObservable();

  // Action Stream for adding/updating/deleting items to Cart
  private itemModifiedSubject = new Subject<CrudAction<Order>>();
  private itemModifiedAction$ = this.itemModifiedSubject.asObservable().pipe(
    startWith({
      item: this.emptyItem,
      action: 'none',
    } as CrudAction<Order>)
  );

  cartWithCRUD$ = merge(
    this.cart$,
    this.itemModifiedAction$.pipe(
      concatMap((operation) => this.saveItem(operation)),
      concatMap(() => this.getItemsInCustomerCart())
    )
  );

  private getItemsInCustomerCart(): Observable<Order[]> {
    const customerId = this.authService.getLoginUsername();
    return this.orderService
      .getOrdersByCustomer(customerId)
      .pipe(tap((items) => this.cartSubject.next(items)));
  }

  private saveItem(
    operation: CrudAction<Order>
  ): Observable<CrudAction<Order>> {
    const order = operation.item;

    if (operation.action === 'add') {
      return this.orderService.createOrder(order.customerId, order).pipe(
        tap((order) =>
          this.alertService.success(
            `Order placed for ${order.quantity} ${order.product}.`
          )
        ),
        // Return the order from the server so it can be added to the array.
        map((order) => ({ item: order, action: operation.action }))
      );
    }

    if (operation.action === 'update') {
      return this.orderService.updateOrder(order.id.toString(), order).pipe(
        tap(
          (order) =>
            this.alertService.success(
              `Order updated for ${order.quantity} ${order.product}.`
            )
          // Return the original order so it can replace the order in the array.
        ),
        map((order) => ({ item: order, action: operation.action }))
      );
    }

    // If there is no operation, return the order.
    return of(operation);
  }

  public async addToCart(product: Product) {
    // Search Orders for customer and product.
    const existingOrder = await lastValueFrom(
      this.getItemsInCustomerCart().pipe(
        map((orders) => orders.find((order) => order.product === product.name))
      )
    );

    if (existingOrder) {
      // If found, increase order quantity and update order.
      this.itemModifiedSubject.next({
        item: { ...existingOrder, quantity: ++existingOrder.quantity },
        action: 'update',
      });
    } else {
      // Else create new order.
      const item = {
        product: product.name,
        productCatalog: product.productCatalog,
        unitPrice: product.unitPrice,
        orderDate: new Date(),
        quantity: 1,
        customerId: this.authService.getLoginUsername(),
      } as Order;
      console.log(item);
      this.itemModifiedSubject.next({ item, action: 'add' });
    }
  }

  public updateItem(item: Order) {
    this.itemModifiedSubject.next({ item, action: 'update' });
  }

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}
}
