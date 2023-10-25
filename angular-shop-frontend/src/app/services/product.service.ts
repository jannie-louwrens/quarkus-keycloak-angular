import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { ProductCatalogService } from './product-catalog.service';
import { Product } from '../models/product';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = '/api/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dataStore: { products: Product[] } = { products: [] };
  private productsByCategory = new BehaviorSubject<Product[]>([]);
  readonly productsByCategoryAction$ = this.productsByCategory.asObservable();

  constructor(
    private http: HttpClient,
    private productCatalogService: ProductCatalogService
  ) {}

  loadProductsByCategory() {
    this.dataStore = { products: [] };
    this.productsByCategory.next(Object.assign({}, this.dataStore).products);

    this.productCatalogService.productCatalogSelectedAction$
      .pipe(
        // Handle the case of no selection.
        filter((productCatalog) => Boolean(productCatalog)),
        // Get the products for the selected catalog.
        switchMap(async (productCatalog) => {
          const params = new HttpParams().set(
            'productCatalogId',
            productCatalog!.id.toString()
          );
          this.http
            .get<Product[]>(apiUrl, { headers, params })
            .subscribe((products) => {
              this.dataStore.products = products;
              this.productsByCategory.next(
                Object.assign({}, this.dataStore).products
              );
            });
        })
      )
      .subscribe();
  }

  createProduct(productCatalogId: number, product: Product): void {
    const params = new HttpParams().set(
      'productCatalogId',
      productCatalogId.toString()
    );
    this.http
      .post<Product>(apiUrl, JSON.stringify(product), { headers, params })
      .subscribe((product) => {
        this.dataStore.products.push(product);
        this.productsByCategory.next(
          Object.assign({}, this.dataStore).products
        );
      });
  }

  updateProduct(product: Product): void {
    this.http
      .put<Product>(`${apiUrl}/${product.id}`, JSON.stringify(product), {
        headers,
      })
      .subscribe((product) => {
        this.dataStore.products.forEach((t, i) => {
          if (t.id === product.id) {
            this.dataStore.products[i] = product;
          }
        });

        this.productsByCategory.next(
          Object.assign({}, this.dataStore).products
        );
      });
  }

  updateAndRemoveProduct(product: Product) {
    this.http
      .put<Product>(`${apiUrl}/${product.id}`, JSON.stringify(product), {
        headers,
      })
      .subscribe((product) => {
        this.dataStore.products.forEach((t, i) => {
          if (t.id === product.id) {
            this.dataStore.products.splice(i, 1);
          }
        });

        this.productsByCategory.next(
          Object.assign({}, this.dataStore).products
        );
      });
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
