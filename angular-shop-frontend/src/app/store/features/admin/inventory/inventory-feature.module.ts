import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule, TemplateRef } from '@angular/core';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbModal,
  NgbModalRef,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { RemoveCommaPipe } from 'src/app/store/utils/pipes/remove-comma.pipe';
import { Product } from './data-access/product';
import { ProductFacadeService } from './data-access/product-facade.service';

@Component({
  selector: 'app-inventory',
  template: `
    <div class="container-fluid">
      <div class="card border-primary">
        <div class="card-header  text-white bg-primary">Product Inventory</div>
        <div class="card-body" *ngIf="vm$ | async as vm">
          <div class="row mb-3 align-items-end">
            <div class="col-md-2 col-xs-2">
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
              class="col"
              *ngIf="selectedCategoryId$ | async as selectedCategoryId"
            >
              <button
                class="btn btn-primary float-end"
                (click)="
                  showAddProductModal(addProductTemplate, selectedCategoryId)
                "
              >
                Create Product
              </button>
            </div>
          </div>

          <div
            *ngIf="!!vm.products && vm.products.length > 0; else elseNoProducts"
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
                  <i
                    class="bi bi-pencil-square text-primary mx-1"
                    style="font-size: 1.5rem"
                    ngbTooltip="Edit Product"
                    (click)="showEditProductModal(editProductTemplate, product)"
                  ></i>
                  <i
                    class="bi bi-trash text-danger mx-1"
                    style="font-size: 1.5rem"
                    ngbTooltip="Delete Product"
                    (click)="
                      showDeleteProductModal(deleteProductTemplate, product)
                    "
                  ></i>
                </div>
              </div>
            </div>
          </div>

          <ng-template #elseNoProducts>
            <div
              class="alert alert-warning d-flex align-items-center border border-warning py-0"
              role="alert"
            >
              <i class="bi bi-exclamation-triangle" style="font-size: 2rem"></i>
              <div class="ms-3">No products found.</div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>

    <ng-template #addProductTemplate>
      <div class="modal-header bg-primary">
        <h4 class="modal-title pull-left text-white">Add Product</h4>
      </div>
      <div class="modal-body">
        <small class="text-danger">* required fields</small>
        <form [formGroup]="productForm!">
          <div class="form-group">
            <label for="name">Name<span class="text-danger">*</span></label>
            <input
              type="text"
              formControlName="name"
              class="form-control"
              id="name"
              required
              [ngClass]="{ 'is-invalid': f.name.touched && f.name.errors }"
              autocomplete="off"
            />
            <div
              *ngIf="f.name.touched && f.name.errors"
              class="invalid-feedback"
            >
              <div *ngIf="f.name.errors.required">
                Please enter a name for the product!
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="description"
              >Description<span class="text-danger">*</span></label
            >
            <textarea
              formControlName="description"
              class="form-control"
              id="description"
              row="3"
              cols="6"
              required
              [ngClass]="{
                'is-invalid': f.description.touched && f.description.errors
              }"
            ></textarea>
            <div
              *ngIf="f.description.touched && f.description.errors"
              class="invalid-feedback"
            >
              <div *ngIf="f.description.errors.required">
                Please enter a description for the product!
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="unitPrice"
              >Unit Price<span class="text-danger">*</span></label
            >
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">R</span>
              </div>
              <input
                type="text"
                formControlName="unitPrice"
                class="form-control"
                id="unitPrice"
                required
                placeholder="0.00"
                appTwoDigitDecimalNumber
                [ngClass]="{
                  'is-invalid': f.unitPrice.touched && f.unitPrice.errors
                }"
                autocomplete="off"
              />
              <div
                *ngIf="f.unitPrice.touched && f.unitPrice.errors"
                class="invalid-feedback"
              >
                <div *ngIf="f.unitPrice.errors.required">
                  Please enter the unit price of the product!
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              (click)="onAddProduct()"
              [disabled]="productForm!.invalid"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              (click)="modalRef!.dismiss()"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ng-template>

    <ng-template #editProductTemplate>
      <div class="modal-header bg-primary">
        <h5 class="modal-title text-white">Edit Product</h5>
      </div>
      <div class="modal-body">
        <small class="text-danger">* required fields</small>
        <form [formGroup]="productForm!">
          <div class="form-group">
            <label for="name">Name<span class="text-danger">*</span></label>
            <input
              type="text"
              formControlName="name"
              class="form-control"
              id="name"
              required
              [ngClass]="{ 'is-invalid': f.name.touched && f.name.errors }"
            />
            <div
              *ngIf="f.name.touched && f.name.errors"
              class="invalid-feedback"
            >
              <div *ngIf="f.name.errors.required">
                Please enter a name for the product!
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="description"
              >Description<span class="text-danger">*</span></label
            >
            <textarea
              formControlName="description"
              class="form-control"
              id="description"
              row="3"
              cols="6"
              required
              [ngClass]="{
                'is-invalid': f.description.touched && f.description.errors
              }"
            ></textarea>
            <div
              *ngIf="f.description.touched && f.description.errors"
              class="invalid-feedback"
            >
              <div *ngIf="f.description.errors.required">
                Please enter a description for the product!
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="unitPrice"
              >Unit Price<span class="text-danger">*</span></label
            >
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">R</span>
              </div>
              <input
                type="text"
                formControlName="unitPrice"
                class="form-control"
                id="unitPrice"
                required
                placeholder="0.00"
                appTwoDigitDecimalNumber
                [ngClass]="{
                  'is-invalid': f.unitPrice.touched && f.unitPrice.errors
                }"
              />
              <div
                *ngIf="f.unitPrice.touched && f.unitPrice.errors"
                class="invalid-feedback"
              >
                <div *ngIf="f.unitPrice.errors.required">
                  Please enter the unit price of the product!
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              (click)="onUpdateProduct()"
              [disabled]="productForm!.invalid"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              (click)="modalRef!.dismiss()"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ng-template>

    <ng-template #deleteProductTemplate>
      <div class="modal-header bg-primary">
        <h5 class="modal-title text-white">Delete Product</h5>
      </div>
      <div class="modal-body">
        Are you sure you want to delete {{ selectedProduct!.name }}?
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-primary"
          (click)="onDeleteProduct(selectedProduct!)"
        >
          Yes
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          (click)="modalRef!.dismiss()"
        >
          No
        </button>
      </div>
    </ng-template>
  `,
})
export class InventoryComponent {
  public readonly productCategories$ =
    this.productFacadeService.productCategories$;
  public readonly products$ = this.productFacadeService.products$;
  public readonly selectedCategoryId$ =
    this.productFacadeService.categorySelectedAction$;

  public readonly vm$ = combineLatest([
    this.products$,
    this.productCategories$,
  ]).pipe(
    map(([products, productCategories]) => {
      return { products, productCategories };
    })
  );

  productForm: FormGroup | undefined;
  modalRef: NgbModalRef | undefined;
  selectedProduct: Product | undefined;

  constructor(
    private productFacadeService: ProductFacadeService,
    private decimalPipe: DecimalPipe,
    private removeComma: RemoveCommaPipe,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  // convenience getter for easy access to form fields
  get f(): any {
    return this.productForm!.controls;
  }

  onCategorySelection(productCategoryId: string): void {
    this.productFacadeService.changeProductCategoryId(productCategoryId);
  }

  showAddProductModal(template: TemplateRef<any>, productCatalogId: number) {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      productCatalogId: productCatalogId,
      description: [null, Validators.required],
      unitPrice: [null, Validators.required],
    });
    this.modalRef = this.modalService.open(template, { backdrop: 'static' });
  }

  onAddProduct() {
    // stop here if form is invalid
    if (this.productForm!.invalid) {
      return;
    }
    let product = <Product>this.productForm!.value;
    product.effectiveDate = new Date();
    this.productFacadeService.createProduct(product);
    this.modalRef!.close();
  }

  showEditProductModal(template: TemplateRef<any>, product: Product) {
    this.selectedProduct = product;
    let unitPrice = this.decimalPipe.transform(product.unitPrice, '1.2-2');
    unitPrice = this.removeComma.transform(unitPrice);
    this.productForm = this.formBuilder.group({
      id: product.id,
      productCatalogId: product.productCatalogId,
      name: [product.name, Validators.required],
      description: [product.description, Validators.required],
      unitPrice: [unitPrice, Validators.required],
    });
    this.modalRef = this.modalService.open(template, { backdrop: 'static' });
  }

  onUpdateProduct() {
    // stop here if form is invalid
    if (this.productForm!.invalid) {
      return;
    }

    let product = {
      ...(<Product>this.productForm!.value),
      effectiveDate: this.selectedProduct!.effectiveDate,
    };
    this.productFacadeService.updateProduct(product);
    this.selectedProduct = {} as Product;
    this.modalRef!.close();
  }

  showDeleteProductModal(template: TemplateRef<any>, product: Product) {
    this.selectedProduct = product;
    this.modalRef = this.modalService.open(template, { backdrop: 'static' });
  }

  onDeleteProduct(product: Product) {
    product.expirationDate = new Date();
    const { productCatalog, ...updatedProduct } = product;
    this.productFacadeService.updateProduct(updatedProduct);
    this.selectedProduct = {} as Product;
    this.modalRef!.close();
  }
}

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
  providers: [DecimalPipe, RemoveCommaPipe],
  declarations: [InventoryComponent],
})
export class InventoryFeatureModule {}
