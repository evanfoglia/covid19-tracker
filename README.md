# TLH Covid Tracker

TLH Covid Tracker using CRUD (Create, Read, Update, Delete) implementation on Angular's Mat-Table. Most importantly frontend updates accordingly
with operations. This is done with the local data in files using Json Server to update the dataset.

**Executing instructions for this project on Angular version 8 including Angular Material 8.**
Extract the project in a workspace
Open 3 command window prompts and in all go to the main folder of the project

In the first command window, run the following command to open the DPS Management screen
ng s -o  /* This compiles the code and opens a browser window to display the form*/

In the second command window, run the following command to enable the orders file to be accessed by application
json-server -p 5555 orders.json

## Screens

Code in action:

![Alt Text](http://localhost:4200)

Output in action:
![Alt Text](http://localhost:5555/orders)

## Data in Files
There are 2 files that this application uses
1. orders.json

Instead of using a database, we are using files realtime. These 2 files will serve as 2 tables and any addition,update or deletes done to any of the form date is done directly on these files. (CRUD OPERATIONS)

## Table structures
The structure of these files are stored as models in orders.ts
structure is defined as shown in the orders.ts example
 
 id: number;
  posNeg: string;
  knownSym: string;
  knownExp: string;
  dot: string;

## Services
Data in orders.json is accessed and updated using the service that are listed as providers in the  app.module.ts  shown below. Any changes to the action needs to be done in these services
providers: [
    OrderService,
  ]

The actual service functionality is in the following file
order.service.ts


## Routing functionality

The root component called app.component.html lists the options for 2 lists namely 
orderslist
with the default being orderlist. The routing is achieved by app-routing.module.ts as follows
const routes: Routes = [
  { path: 'orderlist', component: OrderlistComponent },
  { path: '',   redirectTo: '/orderlist', pathMatch: 'full' },
 ];

## Page Rendering

The Orders page is defaulted from the app.component.html and this invokes orderlist.component.html.
Data is rendered using material table having mat header row and mat rows and is driven by orderlist.component.ts
In the header row, an additional button to "Add" is provided to add new data to the orders by opening a new dialog based of add.dialog.html and add.dialog.ts. Any data added to this will be appended to orders.json file.

In the rows, besides fetching the data from orders.json file, it provides features to update or delete by enabling buttons at row level. Update will call edit.dialog.html and edit.dialog.ts and updates the data on the orders.json file

When the delete button is clicked, the data to be deleted is displayed using the delete.dialog.html and using the process in delete.dialog.ts the data will be deletes from orders.json.file.


## Downloading the date in CSV, Excel, Text and JSON formats
The data in the tables/file that can be downloaded in csv,xls,txt and json formats using the exported command as shown below as coded in orderlist.components.html.
                   (click)="exporter.exportTable('xlsx',{fileName: 'orders'})">Excel
                   (click)="exporter.exportTable('csv',{fileName: 'orders'})">CSV
                   (click)="exporter.exportTable('json',{fileName: 'orders'})">Json
                   (click)="exporter.exportTable('txt',{fileName: 'orders'})">Text

## Validations
Validation of the date fields is done to be in date format
Phone number is validated to be number


## Http functions used to fetch and post the data to file
httpClient.get()
httpClient.post()
httpClient.put()
httpClient.delete()
 
##   To get the data 
   getAllOrders(): void {
    this.httpClient.get<Order[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }


  ## To append the data
addOrder (order: Order): void {
      this.orderObj = {
        "id": order.id,
        "customerid": order.customerid,
        "productid": order.productid,
        "ordernumber": order.ordernumber,
        "sdate": order.sdate,
        "edate": order.edate
      };
      this.httpClient.post("http://localhost:5555/orders/", this.orderObj).subscribe((res:Response) => {
        this.isAdded = true;
      })
    this.dialogData = order;
  }

## To update or edit the data
updateOrder (order: Order): void {
    this.orderObj = {
      "id": order.id,
      "customerid": order.customerid,
      "productid": order.productid,
      "ordernumber": order.ordernumber,
      "sdate": order.sdate,
      "edate": order.edate
    };
    this.httpClient.put("http://localhost:5555/orders/" + order.id, this.orderObj).subscribe((res:Response) => {
        this.isUpdated = true;
      })
    this.dialogData = order;
  }

  ## To delete the data
   deleteOrder (id: number): void {
    console.log(id);
    this.httpClient.delete("http://localhost:5555/orders/" + id, this.orderObj).subscribe((res:Response) => {
        this.isDeleted = true;
      })
  }

  ## Filtering the data from the table - example of assets
     return merge(...displayDataChanges).pipe(map( () => {
        // Filter data

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));