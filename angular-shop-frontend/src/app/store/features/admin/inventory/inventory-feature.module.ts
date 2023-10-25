import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-inventory',
  template: ` <div class="row">
    <div class="col-sm-4">
      <app-product-catalog></app-product-catalog>
    </div>
    <div class="col-sm-8">
      <app-product-list></app-product-list>
    </div>
  </div>`,
})
export class InventoryComponent {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: InventoryComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
  ],
  declarations: [
    InventoryComponent,
    ProductCatalogComponent,
    ProductComponent,
    ProductListComponent,
  ],
})
export class InventoryFeatureModule {}
