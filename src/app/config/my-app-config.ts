import { routes, pathExceptions } from '../common/Routes'
import { OktaAuthGuard } from '@okta/okta-angular';


export default {
    oidc : {
        clientId: '0oa19b358vixWFexj5d7',
        issuer: 'https://dev-30511958.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    }
}


 /**
  * Require authentication on every route except login callback route */
const protectedRoutes = routes.filter(route => !pathExceptions.includes(route.path!));
protectedRoutes.forEach(route => {
  route.canActivate = route.canActivate || [];
  route.canActivate.push(OktaAuthGuard);
});

