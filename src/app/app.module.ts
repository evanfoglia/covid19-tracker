import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {OrderService} from './services/order.service';
import {AssetService} from './services/asset.service';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {AddAssetDialogComponent} from './dialogs/addasset/addasset.dialog.component';
import {EditAssetDialogComponent} from './dialogs/editasset/editasset.dialog.component';
import {DeleteAssetDialogComponent} from './dialogs/deleteasset/deleteasset.dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableExporterModule} from 'mat-table-exporter';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AssetlistComponent} from './assetlist/assetlist.component';
import {OrderlistComponent} from './orderlist/orderlist.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AddDialogComponent,
    AddAssetDialogComponent,
    EditDialogComponent,
    EditAssetDialogComponent,
    DeleteDialogComponent,
    DeleteAssetDialogComponent,
    AssetlistComponent,
    OrderlistComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    MatSidenavModule
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddAssetDialogComponent,
    EditAssetDialogComponent,
    DeleteAssetDialogComponent
  ],
  providers: [
    OrderService,
    AssetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
