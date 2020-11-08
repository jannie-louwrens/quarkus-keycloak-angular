import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { filter, switchMap, tap, catchError, shareReplay } from 'rxjs/operators';

import { UserService } from './user.service';

import { Order } from '../models/order';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/api/orders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private dataStore: { orders: Order[] } = { orders: [] };
  private ordersForCustomer = new BehaviorSubject<Order[]>([]);
  readonly ordersForCustomerAction$: Observable<Order[]>;

  constructor(
    private http: HttpClient,
    private userService: UserService) {
      this.ordersForCustomerAction$ = this.ordersForCustomer.asObservable();
  }

  // All orders
  allOrders$ = this.http.get<Order[]>(apiUrl).pipe(
    tap(console.table),
    shareReplay(1),
    catchError(this.handleError)
  );

  createOrder(order: Order): void {
    this.userService.userAction$.pipe(
      // Handle the case of no selection.
      filter(user => Boolean(user)),
      switchMap(async (user) => this.createOrderForCustomer(user.username, order)),
      catchError(this.handleError)
    ).subscribe();
  }

  getOrdersByCustomer(customerId: string): Observable<Order[]> {
    const params = new HttpParams().set('customerId', customerId);
    return this.http.get<Order[]>(apiUrl, {headers, params});
  }

  updateOrder(id: string, order: Order): void {
    this.http.put<Order>(`${apiUrl}/${id}`, order, {headers}).subscribe(
      order => {
        let itemIndex = this.dataStore.orders.findIndex(el => el.id === order.id);
        this.dataStore.orders[itemIndex] = order;

        this.ordersForCustomer.next(Object.assign({}, this.dataStore).orders);
      }
    );
  }

  loadOrdersForCurrentUser() {
    this.userService.userAction$.pipe(
      // Handle the case of no selection.
      filter(user => Boolean(user)),
      // Get the orders for the current logged in User.
      switchMap(async (user) => {
        this.getOrdersByCustomer(user.username).subscribe(
          orders => {
            this.dataStore.orders = orders;
            this.ordersForCustomer.next(Object.assign({}, this.dataStore).orders);
          }
        );
      }),
      catchError(this.handleError)
    ).subscribe();
  }

  private createOrderForCustomer(customerId: string, order: Order): void {
    const params = new HttpParams().set('customerId', customerId);
    this.http.post<Order>(apiUrl, order, {headers, params}).subscribe(
      order => {
        this.dataStore.orders.push(order);
        this.ordersForCustomer.next(Object.assign({}, this.dataStore).orders);
      }
    );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.statusText}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
