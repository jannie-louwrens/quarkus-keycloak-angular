import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCatalog } from 'src/app/models/product-catalog';

import { ProductCatalogService } from '../../services/product-catalog.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCatalogComponent implements OnDestroy {

  allProductCatalogs$: Observable<ProductCatalog[]>;
  selectedProductCatalog$: Observable<ProductCatalog>;

  constructor(private productCatalogService: ProductCatalogService) {
    this.allProductCatalogs$ = this.productCatalogService.allProductCatalogs$;
    this.selectedProductCatalog$ = this.productCatalogService.productCatalogSelectedAction$;
   }

  ngOnDestroy(): void {
    this.productCatalogService.changeSelectedProductCatalog(null);
  }

  onSelectProductCatalogEvent(productCatalog: ProductCatalog) {
    this.productCatalogService.changeSelectedProductCatalog(productCatalog);
  }

}
