import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CustomerInfo } from './customer-info';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersApiUrl = '/api/customers';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  public customers$ = this.http.get<CustomerInfo[]>(this.customersApiUrl, {
    headers: this.headers,
  });

  constructor(private http: HttpClient) {}
}
