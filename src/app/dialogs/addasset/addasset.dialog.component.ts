import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {AssetService} from '../../services/asset.service';
import {FormControl, Validators} from '@angular/forms';
import {Asset} from '../../models/asset';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/addasset/addasset.dialog.html',
  styleUrls: ['../../dialogs/addasset/addasset.dialog.css']
})

export class AddAssetDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddAssetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Asset,
              public assetService: AssetService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('customerid') ? 'Not a valid customerid' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.assetService.addAsset(this.data);
  }
}
