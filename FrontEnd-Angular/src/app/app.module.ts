import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeadTopComponent } from './components/head-top/head-top.component';
import { LogoAreaComponent } from './components/logo-area/logo-area.component';
import { MenuAreaComponent } from './components/menu-area/menu-area.component';
import { MiddlePartComponent } from './components/middle-part/middle-part.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { Routes, RouterModule, Router } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { LoginComponent } from './components/login/login.component';
import myAppConfig from './config/my-app-config';
import { ProductService } from './services/product.service';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { FooterComponent } from './components/footer/footer.component';


const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth:any,injector:any) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);


const routes: Routes =[
  // {path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ]},
  // {path: 'members', component: MembersPageComponent, canActivate: [ OktaAuthGuard ]},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'cart-details', component: CartDetailsComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'search/:keyword', component: ProductListComponent},
  { path: 'category/:id', component: ProductListComponent},
  { path: 'category', component: ProductListComponent},
  { path: 'products', component: ProductListComponent},
  { path: '', redirectTo:'/products', pathMatch: 'full'},
  { path: '**', redirectTo:'/products', pathMatch: 'full'},
  
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeadTopComponent,
    LogoAreaComponent,
    MenuAreaComponent,
    MiddlePartComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    CheckoutComponent,
    CartStatusComponent,
    LoginComponent,
    OrderHistoryComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    OktaAuthModule,
  ],
  providers: [
    ProductService,{provide: OKTA_CONFIG, useValue: oktaConfig},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
