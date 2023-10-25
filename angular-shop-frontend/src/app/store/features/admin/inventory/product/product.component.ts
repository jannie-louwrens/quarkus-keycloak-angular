import { DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { RemoveCommaPipe } from 'src/app/store/utils/pipes/remove-comma.pipe';
import { AlertService } from 'src/app/store/data-access/alert.service';
import { OrderService } from 'src/app/store/features/admin/orders/data-access/order.service';
import { Order } from '../../orders/data-access/order';
import { Product } from '../data-access/product';
import { ProductService } from '../data-access/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  orderForm: FormGroup | undefined;
  modalRef: NgbModalRef | undefined;
  productsByCategory$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private decimalPipe: DecimalPipe,
    private alertService: AlertService,
    private orderService: OrderService,
    private removeComma: RemoveCommaPipe
  ) {
    this.productsByCategory$ = this.productService.productsByCategoryAction$;
  }

  ngOnInit(): void {
    this.productService.loadProductsByCategory();
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.orderForm!.controls;
  }

  openAddToCartModal(template: TemplateRef<any>, product: Product) {
    let unitPrice = this.decimalPipe.transform(product.unitPrice, '1.2-2');
    unitPrice = this.removeComma.transform(unitPrice);
    this.orderForm = this.formBuilder.group({
      product: [{ value: product.name, disabled: true }],
      unitPrice: [{ value: unitPrice, disabled: true }],
      quantity: [1, [Validators.required, Validators.min(1)]],
      productCatalog: [product.productCatalog],
    });
    this.modalRef = this.modalService.open(template, { backdrop: 'static' });
  }

  onAddItemToCart() {
    // stop here if form is invalid
    if (this.orderForm!.invalid) {
      return;
    }
    let order = <Order>this.orderForm!.getRawValue();
    order.orderDate = new Date();
    this.orderService.createNewOrder(order);
    this.modalRef!.close();
    this.alertService.success(
      `Order placed for ${order.quantity} ${order.product}.`
    );
  }
}
