import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Product } from './product';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApiUrl = '/api/products';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private params = new HttpParams().set(
    'date',
    this.datePipe.transform(new Date().toISOString(), 'yyy-MM-dd')!
  );

  public products$ = this.http.get<Product[]>(this.productApiUrl, {
    headers: this.headers,
    params: this.params,
  });

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  createProduct(
    productCatalogId: number,
    product: Product
  ): Observable<Product> {
    const params = new HttpParams().set(
      'productCatalogId',
      productCatalogId.toString()
    );
    return this.http.post<Product>(
      this.productApiUrl,
      { ...product },
      {
        headers: this.headers,
        params,
      }
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.productApiUrl}/${product.id}`,
      { ...product },
      {
        headers: this.headers,
      }
    );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }
}
