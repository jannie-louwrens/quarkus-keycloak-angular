import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, shareReplay, map } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';

import { OrderService } from '../services/order.service';
import { Customer } from '../models/customer';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/api/customers";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private orderService: OrderService) { }

  // Gets all customers with pending order items in their cart and merges them.
  getCustomersWithOrderItems(): Observable<Customer[]> {
    return combineLatest(
      [
        this.http.get<Customer[]>(apiUrl)
          .pipe(
            shareReplay(1),
            catchError(err => of([] as Customer[]))
          ),
        this.orderService.allOrders$
      ]
    ).pipe(
      map(([customers, orders]) =>
        customers.map(customer => ({
          ...customer,
          orders: orders.filter(order => order.customerId == customer.username)
        }) as Customer)
      )
    );
  }

  getCustomerByUsername(username: string): Observable<Customer> {
    return this.http.get<Customer>(`${apiUrl}/${username}`, {headers})
      .pipe(
        map(customer => {
          return customer;
        })
      );
  }

}
