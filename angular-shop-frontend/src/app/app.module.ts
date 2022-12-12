import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreFeatureModule } from './store/store-feature.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreFeatureModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
