import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, shareReplay } from 'rxjs/operators';

import { AuthService } from '../../../../../auth/data-access/auth.service';

import { Order } from './order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersApiUrl = '/api/orders';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  private ordersForCustomer = new BehaviorSubject<Order[]>([]);
  readonly ordersForCustomerAction$: Observable<Order[]>;

  constructor(private http: HttpClient, private userService: AuthService) {
    this.ordersForCustomerAction$ = this.ordersForCustomer.asObservable();
  }

  // All orders
  allOrders$: Observable<Order[]> = this.http
    .get<Order[]>(this.ordersApiUrl)
    .pipe(shareReplay(1), catchError(this.handleError));

  public getOrdersByCustomer(customerId: string): Observable<Order[]> {
    const params = new HttpParams().set('customerId', customerId);
    return this.http.get<Order[]>(this.ordersApiUrl, {
      headers: this.headers,
      params,
    });
  }

  public createOrder(customerId: string, order: Order): Observable<Order> {
    const params = new HttpParams().set('customerId', customerId);
    return this.http.post<Order>(this.ordersApiUrl, order, {
      headers: this.headers,
      params,
    });
  }

  public updateOrder(id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.ordersApiUrl}/${id}`, order, {
      headers: this.headers,
    });
  }

  private handleError(err: {
    error: { message: any };
    status: any;
    statusText: any;
  }) {
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
    return throwError(() => new Error(errorMessage));
  }
}
