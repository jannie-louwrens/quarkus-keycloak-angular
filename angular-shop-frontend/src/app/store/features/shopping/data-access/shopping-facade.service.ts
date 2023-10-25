import { Injectable } from '@angular/core';
import { combineLatest, map, startWith, Subject } from 'rxjs';
import { ProductCatalogService } from '../../admin/inventory/data-access/product-catalog.service';
import { ProductService } from '../../admin/inventory/data-access/product.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingFacadeService {
  public readonly productCategories$ =
    this.productCatalogService.allProductCatalogs$;

  private categorySelectedSubject = new Subject<number>();
  private categorySelectedAction$ = this.categorySelectedSubject
    .asObservable()
    .pipe(startWith(null));

  public readonly products$ = combineLatest([
    this.productService.productsWithCategory$,
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

  public changeProductCategoryId(productCategoryId: string): void {
    this.categorySelectedSubject.next(+productCategoryId);
  }

  constructor(
    private productCatalogService: ProductCatalogService,
    private productService: ProductService
  ) {}
}
