import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../services/alert.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { RemoveCommaPipe } from 'src/app/pipes/remove-comma.pipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {

  orderForm: FormGroup;
  selectedOrder: Order;
  modalRef: NgbModalRef;
  myOrders$: Observable<Order[]>;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private alertService: AlertService,
    private orderService: OrderService,
    private decimalPipe: DecimalPipe,
    private removeComma: RemoveCommaPipe) {  }

    ngOnInit() {
      this.myOrders$ = this.orderService.ordersForCustomerAction$
      this.orderService.loadOrdersForCurrentUser();
    }

  openEditOrderModal(template: TemplateRef<any>, order: Order) {
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(order.orderDate, p);
    let unitPrice = this.decimalPipe.transform(order.unitPrice, "1.2-2");
    unitPrice = this.removeComma.transform(unitPrice);
    this.orderForm = this.formBuilder.group({
      'id' : order.id,
      'customerId': order.customerId,
      'product' : [{value: order.product, disabled: true}],
      'productCatalog' : [{value: order.productCatalog, disabled: true}],
      'unitPrice' : [{value: unitPrice, disabled: true}],
      'orderDate' : [{value: dtr, disabled: true}],
      'quantity' : [order.quantity, [Validators.required, Validators.min(1)]]
    });
    this.selectedOrder = order;
    this.modalRef = this.modalService.open(template, {backdrop: 'static'});
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.orderForm.controls;
  }

  onUpdateOrder() {
    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }
    let order = <Order>this.orderForm.getRawValue();
    this.orderService.updateOrder(order.id.toString(), order);
    this.modalRef.close();
    this.alertService.success(`${order.product} order quantity updated from ${this.selectedOrder.quantity} to ${order.quantity}.`);
  };

}
