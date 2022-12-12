import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ProductCatalog } from '../data-access/product-catalog';
import { ProductCatalogService } from '../data-access/product-catalog.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCatalogComponent implements OnDestroy {
  allProductCatalogs$ = this.productCatalogService.allProductCatalogs$;
  selectedProductCatalog$ =
    this.productCatalogService.productCatalogSelectedAction$;

  constructor(private productCatalogService: ProductCatalogService) {}

  ngOnDestroy(): void {
    this.productCatalogService.changeSelectedProductCatalog(null);
  }

  onSelectProductCatalogEvent(productCatalog: ProductCatalog) {
    this.productCatalogService.changeSelectedProductCatalog(productCatalog);
  }
}
