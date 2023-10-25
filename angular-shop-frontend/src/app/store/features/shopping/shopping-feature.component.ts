import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { AuthModule } from 'src/app/auth/auth.module';
import { Product } from '../admin/inventory/data-access/product';
import { CartFacadeService } from '../cart/data-access/cart-facade.service';
import { ShoppingFacadeService } from './data-access/shopping-facade.service';

@Component({
  selector: 'app-shopping',
  template: `
    <div *ngIf="vm$ | async as vm" class="row">
      <div>
        <div class="card border-primary">
          <div class="card-header  text-white bg-primary">Product List</div>
          <div class="card-body" *ngIf="vm$ | async as vm">
            <div class="col-md-2 col-xs-12 mb-3">
              <label>Filter by category:</label>
              <select
                class="form-select"
                (change)="onCategorySelection($any($event.target).value)"
              >
                <option value="0">- Display All -</option>
                <option
                  *ngFor="let category of vm.productCategories"
                  [value]="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div
              *ngIf="
                !!vm.products && vm.products.length > 0;
                else elseNoProducts
              "
              class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4"
            >
              <div *ngFor="let product of vm.products">
                <div class="card h-100 border-primary">
                  <div class="card-header text-white bg-primary">
                    {{ product.name }}
                  </div>
                  <div class="card-body">
                    <p class="card-text h-50">{{ product.description }}</p>
                    <h5 class="card-text h-50 float-end d-flex align-items-end">
                      {{
                        product.unitPrice | currency : 'ZAR' : 'symbol-narrow'
                      }}
                    </h5>
                  </div>
                  <div class="card-footer">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm float-right"
                      (click)="onAddToCart(product)"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <ng-template #elseNoProducts>
              <div
                class="alert alert-warning d-flex align-items-center border border-warning py-0"
                role="alert"
              >
                <i
                  class="bi bi-exclamation-triangle"
                  style="font-size: 2rem"
                ></i>
                <div class="ms-3">No products found.</div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ShoppingComponent {
  public readonly productCategories$ =
    this.shoppingFacadeService.productCategories$;
  public readonly products$ = this.shoppingFacadeService.products$;

  public readonly vm$ = combineLatest([
    this.products$,
    this.productCategories$,
  ]).pipe(
    map(([products, productCategories]) => {
      return { products, productCategories };
    })
  );

  constructor(
    private shoppingFacadeService: ShoppingFacadeService,
    private cartFacadeService: CartFacadeService
  ) {}

  onCategorySelection(productCategoryId: string): void {
    this.shoppingFacadeService.changeProductCategoryId(productCategoryId);
  }

  onAddToCart(product: Product) {
    this.cartFacadeService.addToCart(product);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ShoppingComponent },
    ]),
    AuthModule,
  ],
  declarations: [ShoppingComponent],
})
export class ShoppingFeatureModule {}
