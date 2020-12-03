import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { AssetlistComponent } from './assetlist/assetlist.component';
import { HomePageComponent } from './home-page/home-page.component';
/*import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';*/

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'orderlist', component: OrderlistComponent },
 // { path: '',   redirectTo: '/orderlist', pathMatch: 'full' },
  { path: 'assetslist', component: AssetlistComponent }
 // { path: 'about',        component: AboutComponent },
 // { path: 'privacy',        component: PrivacyComponent },
 // { path: 'terms',        component: TermsComponent },
 // { path: '',   redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[OrderlistComponent,AssetlistComponent]
