import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UserProfile } from 'src/app/auth/data-access/user-profile';

@Component({
  selector: 'app-sidebar',
  template: `
    <div
      class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100"
    >
      <a
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        routerLink="/"
        ><i class="bi bi-shop me-3" style="font-size: 2.5rem;"></i>
        <h4 class="text-white mb-md-0 me-md-auto">Foodies</h4></a
      >
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a
            class="nav-link  text-white"
            routerLink="/shopping"
            routerLinkActive="active"
          >
            <i class="bi bi-bag-heart me-2" style="font-size: 1.5rem"></i>
            Shopping
          </a>
        </li>
        <li class="nav-item" *ngIf="userProfile?.isAdministrator">
          <a
            href="#"
            (click)="collapse.toggle(); (false)"
            class="nav-link text-white"
          >
            <i class="bi bi-person-gear me-2" style="font-size: 1.5rem"></i>
            Administrator
          </a>
        </li>
        <ul
          class="nav nav-pills flex-column ms-3"
          #collapse="ngbCollapse"
          [(ngbCollapse)]="isCollapsed"
        >
          <li class="nav-item">
            <a
              href="#"
              class="nav-link text-white"
              routerLink="/admin/customers"
              routerLinkActive="active"
            >
              <i class="bi bi-people me-2" style="font-size: 1.5rem"></i>
              Customers
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#"
              class="nav-link text-white"
              routerLink="/admin/orders"
              routerLinkActive="active"
            >
              <i class="bi bi-file-text me-2" style="font-size: 1.5rem"></i>
              Orders
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#"
              class="nav-link text-white"
              routerLink="/admin/inventory"
              routerLinkActive="active"
            >
              <i class="bi bi-boxes me-2" style="font-size: 1.5rem"></i>
              Products
            </a>
          </li>
        </ul>
      </ul>
      <hr />
      <div class="dropdown" ngbDropdown>
        <a
          class="nav-link dropdown-toggle"
          ngbDropdownToggle
          role="button"
          (click)="(false)"
        >
          <i class="bi bi-person-circle me-2" style="font-size: 2rem;"></i>
          <strong>{{ userProfile?.username }}</strong>
        </a>
        <div ngbDropdownMenu class="dropdown-menu dropdown-menu-end">
          <div ngbDropdownItem>
            <div class="font-weight-bold" role="menuitem">
              {{ userProfile?.firstName }}
              {{ userProfile?.lastName }}
            </div>
            <small class="text-secondary" role="menuitem">
              {{ userProfile?.username }}
            </small>
          </div>
          <div class="divider dropdown-divider"></div>
          <a
            ngbDropdownItem
            class="dropdown-item"
            style="cursor: pointer"
            (click)="doLogout()"
            >Logout</a
          >
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() userProfile!: UserProfile | null;
  @Output() logout = new EventEmitter<void>();

  public isCollapsed = true;

  public doLogout(): void {
    this.logout.emit();
  }
}
