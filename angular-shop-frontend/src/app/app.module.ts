import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShopFeatureModule } from './shop/shop-feature.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ShopFeatureModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
