import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, shareReplay, map } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';

import { OrderService } from '../../orders/data-access/order.service';
import { CustomerInfo } from './customer-info';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = '/api/customers';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersApiUrl = '/api/customers';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  public customers$ = this.http.get<CustomerInfo[]>(this.customersApiUrl, {
    headers: this.headers,
  });

  constructor(private http: HttpClient, private orderService: OrderService) {}

  // Gets all customers with pending order items in their cart and merges them.
  getCustomersWithOrderItems(): Observable<CustomerInfo[]> {
    return combineLatest([
      this.http.get<CustomerInfo[]>(apiUrl).pipe(
        shareReplay(1),
        catchError((err) => of([] as CustomerInfo[]))
      ),
      this.orderService.allOrders$,
    ]).pipe(
      map(([customers, orders]) =>
        customers.map(
          (customer) =>
            ({
              ...customer,
              orders: orders.filter(
                (order: { customerId: string | undefined }) =>
                  order.customerId == customer.username
              ),
            } as CustomerInfo)
        )
      )
    );
  }

  getCustomerByUsername(username: string): Observable<CustomerInfo> {
    return this.http
      .get<CustomerInfo>(`${apiUrl}/${username}`, { headers })
      .pipe(
        map((customer) => {
          return customer;
        })
      );
  }
}
