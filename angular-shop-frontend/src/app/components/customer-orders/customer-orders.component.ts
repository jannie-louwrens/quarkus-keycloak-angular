import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, flatMap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styles: [],
})
export class CustomerOrdersComponent implements OnInit {
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadOrdersByUsername(this.route.snapshot.params['username']);
  }

  loadOrdersByUsername(username: string) {
    this.customerService
      .getCustomerByUsername(username)
      .pipe(
        tap((data) => (this.customer = data)),
        flatMap((customer) => {
          const username = customer!.username ?? '';
          return this.orderService.getOrdersByCustomer(username).pipe(
            tap((orders: Order[]) => {
              customer.orders = orders;
            })
          );
        })
      )
      .subscribe();
  }
}
