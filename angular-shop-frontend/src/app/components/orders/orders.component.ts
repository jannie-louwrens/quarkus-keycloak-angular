import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [],
})
export class OrdersComponent {
  customersWithOrderItems$ = this.customerService.getCustomersWithOrderItems();

  constructor(private customerService: CustomerService) {}
}
