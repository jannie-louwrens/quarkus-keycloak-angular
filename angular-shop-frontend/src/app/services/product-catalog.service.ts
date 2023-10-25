import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';

import { ProductCatalog } from '../models/product-catalog';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = '/api/productcatalogs';

@Injectable({
  providedIn: 'root',
})
export class ProductCatalogService {
  private productCatalogSelectedSubject =
    new BehaviorSubject<ProductCatalog | null>(null);
  productCatalogSelectedAction$ =
    this.productCatalogSelectedSubject.asObservable();

  allProductCatalogs$ = this.http
    .get<ProductCatalog[]>(apiUrl, { headers })
    .pipe(tap(console.table), shareReplay(1), catchError(this.handleError));

  constructor(private http: HttpClient) {}

  // Change the selected productCatalog.
  changeSelectedProductCatalog(productCatalog: ProductCatalog | null): void {
    this.productCatalogSelectedSubject.next(productCatalog);
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
    return throwError(errorMessage);
  }
}
