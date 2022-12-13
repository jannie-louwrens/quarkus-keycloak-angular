import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { ProductCatalog } from './product-catalog';

@Injectable({
  providedIn: 'root',
})
export class ProductCatalogService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private apiUrl = '/api/productcatalogs';

  allProductCatalogs$: Observable<ProductCatalog[]> = this.http
    .get<ProductCatalog[]>(this.apiUrl, { headers: this.headers })
    .pipe(shareReplay(1), catchError(this.handleError));

  constructor(private http: HttpClient) {}

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
