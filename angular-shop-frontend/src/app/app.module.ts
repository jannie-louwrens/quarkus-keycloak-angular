import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreFeatureModule } from './store/store-feature.module';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [],
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreFeatureModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
