import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {AssetService} from '../../services/asset.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-editasset.dialog',
  templateUrl: '../../dialogs/editasset/editasset.dialog.html',
  styleUrls: ['../../dialogs/editasset/editasset.dialog.css']
})
export class EditAssetDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditAssetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public assetService: AssetService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('customer') ? 'Not a valid customer' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.assetService.updateAsset(this.data);
  }
}
