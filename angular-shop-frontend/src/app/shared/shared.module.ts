import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyFontAwesomeModule } from './my-font-awesome.module';

@NgModule({
  imports: [
    NgbModule,
    MyFontAwesomeModule
  ],
  exports: [
    NgbModule,
    MyFontAwesomeModule
  ]
})
export class SharedModule { }
