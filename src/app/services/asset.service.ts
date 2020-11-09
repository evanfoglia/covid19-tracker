import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Asset} from '../models/asset';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AssetService {
  private readonly API_URL = 'http://localhost:5556/assets';

  dataChange: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}
  confirmationString:string = "New asset has been added";
  isAdded: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
  assetObj:object = {};

  get data(): Asset[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllAssets(): void {
    this.httpClient.get<Asset[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }


  addAsset (asset: Asset): void {
      this.assetObj = {
        "id": asset.id,
        "compressorid": asset.compressorid,
        "gatewayid": asset.gatewayid,
        "chillerid": asset.chillerid,
        "phonenumber": asset.phonenumber,
        "simiccid": asset.simiccid
      };
      this.httpClient.post("http://localhost:5556/assets/", this.assetObj).subscribe((res:Response) => {
        this.isAdded = true;
      })
    this.dialogData = asset;
  }

  updateAsset (asset: Asset): void {
    this.assetObj = {
      "id": asset.id,
        "compressorid": asset.compressorid,
        "gatewayid": asset.gatewayid,
        "chillerid": asset.chillerid,
        "phonenumber": asset.phonenumber,
        "simiccid": asset.simiccid
    };
    this.httpClient.put("http://localhost:5556/assets/" + asset.id, this.assetObj).subscribe((res:Response) => {
        this.isUpdated = true;
      })
    this.dialogData = asset;
  }

  deleteAsset (id: number): void {
    console.log(id);
    this.httpClient.delete("http://localhost:5556/assets/" + id, this.assetObj).subscribe((res:Response) => {
        this.isDeleted = true;
      })
  }
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




