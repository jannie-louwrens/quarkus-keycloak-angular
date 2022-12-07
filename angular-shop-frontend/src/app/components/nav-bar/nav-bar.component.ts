import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/data-access/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [
    `
      .count {
        padding: 2px 3px;
        z-index: 15;
        position: relative;
        left: -5px;
        top: -10px;
      }
    `,
  ],
})
export class NavBarComponent implements OnInit {
  isNavbarCollapsed = true;
  userProfile$ = this.authService.loadUserProfile$;
  myOrders$ = this.orderService.ordersForCustomerAction$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderService.loadOrdersForCurrentUser();
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  async doLogout() {
    await this.router.navigate(['/']);
    await this.authService.logout();
  }
}
