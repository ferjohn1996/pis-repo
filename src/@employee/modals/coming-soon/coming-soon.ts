import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'coming-soon-dialog',
  templateUrl: './coming-soon.html',
  encapsulation: ViewEncapsulation.None
})

export class ComingSoonModalComponent {
  action: string;
  dialogTitle: string;

  constructor(
    public matDialogRef: MatDialogRef<ComingSoonModalComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {

  }
}
