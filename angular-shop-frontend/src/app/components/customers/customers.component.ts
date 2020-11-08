import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: [
  ]
})
export class CustomersComponent implements OnInit {

  customersWithOrderItems$: Observable<Customer[]>;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customersWithOrderItems$ = this.customerService.getCustomersWithOrderItems();
  }

}
