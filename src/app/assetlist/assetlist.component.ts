import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AssetService} from '../services/asset.service';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Asset} from '../models/asset';
import {DataSource} from '@angular/cdk/collections';
import {AddAssetDialogComponent} from '../dialogs/addasset/addasset.dialog.component';
import {EditAssetDialogComponent} from '../dialogs/editasset/editasset.dialog.component';
import {DeleteAssetDialogComponent} from '../dialogs/deleteasset/deleteasset.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './assetlist.component.html',
  styleUrls: ['./assetlist.component.css']
})

export class AssetlistComponent implements OnInit {
  displayedColumns = ['compressorid', 'gatewayid', 'chillerid', 'phonenumber', 'simiccid', 'actions'];
  exampleDatabase: AssetService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public assetService: AssetService) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(asset: Asset) {
    const dialogRef = this.dialog.open(AddAssetDialogComponent, {
      data: {asset: asset }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.assetService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, compressorid: number, gatewayid: number, chillerid: number, phonenumber: number, simiccid: number) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditAssetDialogComponent, {
      data: {id: id, compressorid: compressorid, gatewayid: gatewayid, chillerid: chillerid, phonenumber: phonenumber, simiccid: simiccid}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.assetService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, compressorid: number, gatewayid: number, chillerid: number, phonenumber: number, simiccid: number) {
    this.index = i;
    this.id = compressorid;
    const dialogRef = this.dialog.open(DeleteAssetDialogComponent, {
      data: {id: id, compressorid: compressorid, gatewayid: gatewayid, chillerid: chillerid, phonenumber: phonenumber, simiccid: simiccid}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/



  public loadData() {
    this.exampleDatabase = new AssetService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Asset> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Asset[] = [];
  renderedData: Asset[] = [];

  constructor(public _exampleDatabase: AssetService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Asset[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllAssets();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((asset: Asset) => {	
          const searchStr = (asset.compressorid + asset.gatewayid + asset.chillerid + asset.phonenumber + asset.simiccid).toString().toLowerCase();	
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;	
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Asset[]): Asset[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'compressorid': [propertyA, propertyB] = [a.compressorid, b.compressorid]; break;
        case 'gatewayid': [propertyA, propertyB] = [a.gatewayid, b.gatewayid]; break;
        case 'chillerid': [propertyA, propertyB] = [a.chillerid, b.chillerid]; break;
        case 'phonenumber': [propertyA, propertyB] = [a.phonenumber, b.phonenumber]; break;
        case 'simiccid': [propertyA, propertyB] = [a.simiccid, b.simiccid]; break;
      /*  case 'url': [propertyA, propertyB] = [a.url, b.url]; break;
        case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
        case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;*/
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
