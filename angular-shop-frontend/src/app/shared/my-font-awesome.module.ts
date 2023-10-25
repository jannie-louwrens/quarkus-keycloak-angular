import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faCheckCircle , faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faCog, faShoppingBasket, faShoppingCart , faStore, faUserCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class MyFontAwesomeModule {

  constructor(library: FaIconLibrary) {
    // Add an icons to the library for convenient access in other components
    library.addIcons(
      faCheckCircle,
      faEdit,
      faTrashAlt,
      faCog,
      faShoppingBasket,
      faShoppingCart,
      faStore,
      faUserCircle,
      faSpinner);
  }

}
