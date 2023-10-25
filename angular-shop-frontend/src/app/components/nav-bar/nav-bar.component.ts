import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [`
  .count {
    padding: 2px 3px;
    z-index:15;
    position:relative;
    left: -5px;
    top:-10px
  }
`]
})
export class NavBarComponent implements OnInit {
  isNavbarCollapsed = true;
  user$: Observable<User>;
  myOrders$: Observable<Order[]>;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
  ) {
    this.user$ = this.userService.userAction$;
    this.myOrders$ = this.orderService.ordersForCustomerAction$;
   }

  ngOnInit(): void {
    this.userService.init();
    this.orderService.loadOrdersForCurrentUser();
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  async doLogout() {
    await this.router.navigate(['/']);
    await this.userService.logout();
  }

}
