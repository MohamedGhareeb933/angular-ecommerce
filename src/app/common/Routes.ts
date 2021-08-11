import { Routes } from '@angular/router';
import { CartDetailsComponent } from '../component/cart-details/cart-details.component';
import { CheckoutComponent } from '../component/checkout/checkout.component';
import { ProductDetailsComponent } from '../component/product-details/product-details.component';
import { ProductListComponent } from '../component/product-list/product-list.component';


/**  path : Match the given url , component: when path matches , create new instance of component.
 *   redirect need / to prefix. pathmatch full read all path url that in case of empty dosnt suffex addtional url.
 *   generic wild card that matches anything that dosnt matches specific path defined.
*/
export const routes: Routes = [

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

export const config = {
    clientId: '0oa19b358vixWFexj5d7',
    issuer: 'https://${dev-30511958.okta.com}/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
};
