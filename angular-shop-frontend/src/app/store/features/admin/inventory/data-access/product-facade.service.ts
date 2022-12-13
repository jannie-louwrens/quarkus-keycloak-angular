import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  combineLatestWith,
  concatMap,
  map,
  merge,
  Observable,
  of,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { CrudAction } from 'src/app/shared/crud-action';
import { AlertService } from 'src/app/store/data-access/alert.service';
import { Product } from './product';
import { ProductCatalogService } from './product-catalog.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductFacadeService {
  private emptyProduct!: Product;

  public readonly productCategories$ =
    this.productCatalogService.allProductCatalogs$;

  private categorySelectedSubject = new Subject<number>();
  public readonly categorySelectedAction$ = this.categorySelectedSubject
    .asObservable()
    .pipe(startWith(0));

  private productsSubject = new BehaviorSubject<Product[]>([]);
  private productsSource$ = this.productsSubject.asObservable();

  // Action Stream for adding/updating/deleting Products.
  private productModifiedSubject = new BehaviorSubject<CrudAction<Product>>({
    item: this.emptyProduct,
    action: 'none',
  });
  private productModifiedAction$ = this.productModifiedSubject.asObservable();

  private productsWithCRUD$ = merge(
    this.productsSource$,
    this.productModifiedAction$.pipe(
      concatMap((operation) => this.saveProduct(operation)),
      concatMap(() => this.getProducts())
    )
  );

  public readonly products$ = combineLatest([
    this.productsWithCRUD$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter((product) =>
        selectedCategoryId
          ? product.productCatalogId === selectedCategoryId
          : true
      )
    )
  );

  private getProducts(): Observable<Product[]> {
    return this.productService.products$.pipe(
      combineLatestWith(this.productCategories$),
      map(([products, categories]) =>
        products.map(
          (product) =>
            ({
              ...product,
              productCatalog: categories.find(
                (c) => product.productCatalogId === c.id
              )?.name,
            } as Product)
        )
      ),
      // Emit the data into the stream
      tap((productsWithCategories) =>
        this.productsSubject.next(productsWithCategories)
      )
    );
  }

  private saveProduct(
    operation: CrudAction<Product>
  ): Observable<CrudAction<Product>> {
    const product = operation.item;

    if (operation.action === 'add') {
      return this.productService
        .createProduct(product.productCatalogId, product)
        .pipe(
          // Return the product from the server so it can be added to the array.
          map((product) => ({ item: product, action: operation.action })),
          tap(() => this.alertService.success(`Added ${product.name} product.`))
        );
    }

    if (operation.action === 'update') {
      return this.productService.updateProduct(product).pipe(
        tap(
          (product) =>
            this.alertService.success(`Updated ${product.name} product.`)
          // Return the original product so it can replace the product in the array.
        ),
        map((product) => ({ item: product, action: operation.action }))
      );
    }

    // If there is no operation, return the order.
    return of(operation);
  }

  public changeProductCategoryId(productCategoryId: string): void {
    this.categorySelectedSubject.next(+productCategoryId);
  }

  public createProduct(product: Product): void {
    this.productModifiedSubject.next({ item: product, action: 'add' });
  }

  public updateProduct(product: Product): void {
    this.productModifiedSubject.next({ item: product, action: 'update' });
  }

  constructor(
    private productCatalogService: ProductCatalogService,
    private productService: ProductService,
    private alertService: AlertService
  ) {}
}
