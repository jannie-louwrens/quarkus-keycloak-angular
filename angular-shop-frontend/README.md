# Quarkus Shop Frontend

## Package Installations:

Angular NG Bootstrap: 
`ng add @ng-bootstrap/ng-bootstrap` 
(This will install Bootstrap & Angular Localize)

Bootswatch: 
`yarn add bootswatch`

Bootstrap Icons: 
`yarn add ng-bootstrap-icons` 
(Hold off on this for now and go with FontAwesome instead)

Angular Fontawesome: 
`ng add @fortawesome/angular-fontawesome`
Choose Icon Packages: Free Solid Icons & Free Regular Icons

If needed:

Angular Material: 
`ng add @angular/material`

## Icon Modules Creation:

### Bootstrap Icons Module:

`ng g module shared/my-bootstrap-icons --flat=true`

```
import { NgModule } from '@angular/core';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { Basket, Cart3, Check2Circle, House, Pencil, PersonCircle } from 'ng-bootstrap-icons/icons';

// Select some icons (use an object, not an array)
const icons = {
  Basket,
  Cart3,
  Check2Circle,
  House,
  Pencil,
  PersonCircle
};

@NgModule({
  imports: [
    BootstrapIconsModule.pick(icons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class MyBootstrapIconsModule { }
```

### Fontawesome Module:

`ng g module shared/my-font-awesome --flat=true`

```
import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Select some icons (use an object, not an array)
const icons = {
  faCheckCircle,
  faEdit,
  faShoppingBasket,
  faShoppingCart,
  faStore,
  faUserCircle
};

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
    // Add an icon to the library for convenient access in other components
    /*library.addIcons(faCheckCircle);
    library.addIcons(faEdit);
    library.addIcons(faShoppingBasket);
    library.addIcons(faShoppingCart);
    library.addIcons(faStore);
    library.addIcons(faUserCircle);*/

    library.add(icons);
  }

}
```

### Material Icons Module:
(If it is installed)

`ng g module shared/my-material --flat=true` 

```
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = {
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule
};

@NgModule({
  declarations: [],
  imports: [
    ...materialModules
  ],
  exports: [
    ...materialModules
  ]
})
export class MyMaterialModule { 

}
```

---

## References
[Angular Folder Structure](https://angular-folder-structure.readthedocs.io/en/latest/)

[File Structure](https://itnext.io/choosing-the-right-file-structure-for-angular-in-2020-and-beyond-a53a71f7eb05)

// https://levelup.gitconnected.com/a-complete-guide-to-angular-modules-faf5a85e3e60

// https://betterfullstack.com/how-to-use-angular-parameter-in-right-way/

[Data Composition with RxJS | Deborah Kurata](https://www.youtube.com/watch?time_continue=1&v=Z76QlSpYcck&feature=emb_logo)

// https://betterfullstack.com/an-explanation-of-hot-and-cold-observable/

// https://alligator.io/rxjs/hot-cold-observables/

// https://betterfullstack.com/how-to-use-async-pipe-in-angular/

// https://levelup.gitconnected.com/angular-and-rxjs-patterns-use-reactive-programming-to-compose-and-manage-data-in-angular-apps-2e0c4ce7a39c

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
