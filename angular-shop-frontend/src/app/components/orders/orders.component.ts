import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {

  customersWithOrderItems$: Observable<Customer[]>;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customersWithOrderItems$ = this.customerService.getCustomersWithOrderItems();
  }

}
