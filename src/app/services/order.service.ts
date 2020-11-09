import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Order} from '../models/order';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class OrderService {
  private readonly API_URL = 'http://localhost:5555/orders';

  dataChange: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}
  confirmationString:string = "New product has been added";
  isAdded: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
  orderObj:object = {};

  get data(): Order[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllOrders(): void {
    this.httpClient.get<Order[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

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

  deleteOrder (id: number): void {
    console.log(id);
    this.httpClient.delete("http://localhost:5555/orders/" + id, this.orderObj).subscribe((res:Response) => {
        this.isDeleted = true;
      })
  }
}







