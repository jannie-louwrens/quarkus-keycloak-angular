import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RemoveCommaPipe } from 'src/app/store/utils/pipes/remove-comma.pipe';
import { AlertService } from 'src/app/store/data-access/alert.service';
import { Product } from '../data-access/product';
import { ProductCatalogService } from '../data-access/product-catalog.service';
import { ProductService } from '../data-access/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  selectedCategory$ = this.productCatalogService.productCatalogSelectedAction$;
  productsByCategory$ = this.productService.productsByCategoryAction$;

  productForm: FormGroup | undefined;
  modalRef: NgbModalRef | undefined;

  selectedProduct: Product | undefined;

  constructor(
    private productService: ProductService,
    private productCatalogService: ProductCatalogService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private alertService: AlertService,
    private decimalPipe: DecimalPipe,
    private removeComma: RemoveCommaPipe
  ) {}

  ngOnInit(): void {
    this.productService.loadProductsByCategory();
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.productForm!.controls;
  }

  openAddProductModal(template: TemplateRef<any>, productCatalogId: string) {
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
    this.productService.createProduct(product.productCatalogId, product);
    this.modalRef!.close();
    this.alertService.success(`Added ${product.name} product.`);
  }

  openEditProductModal(template: TemplateRef<any>, product: Product) {
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
    let product = <Product>this.productForm!.value;
    this.productService.updateProduct(product);
    this.modalRef!.close();
    this.alertService.success(`Updated ${product.name} product.`);
  }

  openDeleteProductModal(template: TemplateRef<any>, product: Product) {
    this.selectedProduct = product;
    this.modalRef = this.modalService.open(template, { backdrop: 'static' });
  }

  onDeleteProduct(product: Product) {
    product.expirationDate = new Date();
    this.productService.updateAndRemoveProduct(product);
    this.selectedProduct = {} as Product;
    this.modalRef!.close();
    this.alertService.success(`Deleted ${product.name} product.`);
  }
}
