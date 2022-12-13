import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { switchMap } from 'rxjs';
import { AppAuthGuard } from '../auth/app-auth.guard';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/data-access/auth.service';
import { AlertComponent } from './ui/alert/alert.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { CartFacadeService } from './features/cart/data-access/cart-facade.service';
import { HeaderComponent } from './ui/header/header.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { AlertService } from './data-access/alert.service';
import { HttpErrorInterceptor } from './utils/interceptors/http-error.interceptor';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout',
  template: `
    <div class="container-fluid">
      <div class="row flex-nowrap ">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ">
          <app-sidebar
            [userProfile]="userProfile$ | async"
            (logout)="doLogout()"
          ></app-sidebar>
        </div>
        <div class="col px-0">
          <app-header
            [itemsInCartCount]="itemsInCartCount$ | async"
          ></app-header>
          <div class="container-fluid py-3">
            <app-alert
              *ngIf="notificationMessage$ | async as message"
              [message]="message"
            ></app-alert>
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LayoutComponent {
  public readonly userProfile$ = this.authService.loadUserProfile$;
  public readonly notificationMessage$ = this.alertService.message$;
  public readonly itemsInCartCount$ = this.cartFacadeService.cartWithCRUD$.pipe(
    switchMap(async (items) => items.length)
  );

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private cartFacadeService: CartFacadeService
  ) {}

  public doLogout(): void {
    this.authService.logout();
  }
}

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'shopping',
        loadChildren: () =>
          import('./features/shopping/shopping-feature.component').then(
            (m) => m.ShoppingFeatureModule
          ),
        canActivate: [AppAuthGuard],
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart-feature.component').then(
            (m) => m.CartFeatureModule
          ),
        canActivate: [AppAuthGuard],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/admin-feature.module').then(
            (m) => m.AdminFeatureModule
          ),
        canActivate: [AppAuthGuard],
      },
      { path: '', redirectTo: 'shopping', pathMatch: 'full' },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbCollapseModule,
    NgbTooltipModule,
    NgbDropdownModule,
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    DatePipe,
  ],
  exports: [RouterModule],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    AlertComponent,
  ],
})
export class StoreFeatureModule {}
