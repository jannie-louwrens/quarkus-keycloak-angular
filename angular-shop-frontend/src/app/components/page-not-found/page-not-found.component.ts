import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <div class="container mt-5">
  <div class="alert alert-warning mx-auto">
    <h4 class="alert-heading">Warning!</h4>
    <p class="mb-0">This is not the page you were looking for!</p>
  </div>
</div>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent {

}
