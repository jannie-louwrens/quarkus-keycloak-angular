import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary py-1">
      <div class="container-fluid">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a
              class="nav-link p-0"
              routerLink="/cart"
              routerLinkActive="active"
              ngbTooltip="My Orders"
            >
              <i class="bi bi-cart3" style="font-size: 2rem"></i>
              <span class="badge rounded-pill bg-danger count">{{
                itemsInCartCount
              }}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      .count {
        z-index: 15;
        position: relative;
        left: -10px;
        top: -20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() itemsInCartCount!: number | null;
}
