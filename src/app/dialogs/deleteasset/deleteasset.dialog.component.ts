import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {AssetService} from '../../services/asset.service';


@Component({
  selector: 'app-deleteasset.dialog',
  templateUrl: '../../dialogs/deleteasset/deleteasset.dialog.html',
  styleUrls: ['../../dialogs/deleteasset/deleteasset.dialog.css']
})
export class DeleteAssetDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteAssetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public assetService: AssetService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.assetService.deleteAsset(this.data.id);
  }
}
