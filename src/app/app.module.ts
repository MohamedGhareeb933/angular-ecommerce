import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryService } from './services/product-category.service';
import { ProductCategoryComponent } from './component/product-category/product-category.component';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

/**  path : Match the given url , component: when path matches , create new instance of component.
 *  redirect need / to prefix. pathmatch full read all path url that in case of empty dosnt suffex addtional url.
 *  ** generic wild card that matches anything that dosnt matches specific path defined.
*/
const routes: Routes = [

  { path: 'cart-details', component: CartDetailsComponent },

  { path: 'products/:id', component: ProductDetailsComponent },

  { path: 'checkout', component: CheckoutComponent },

  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
  ],
  imports: [
    RouterModule.forRoot(routes), // configure the router based on routes.
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, ProductCategoryService, CartService], // inject service into other parts of the application.
  bootstrap: [AppComponent]
})
export class AppModule { }
