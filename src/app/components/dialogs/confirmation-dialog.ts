import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { playlist } from "src/app/models/playlist.models";

export interface message{
    text: string
}

@Component({
    selector: 'confirmation-dialog',
    templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {

    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialog>,
        @Inject(MAT_DIALOG_DATA) public data: message) {}

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onOKClick(): void{
        this.dialogRef.close(true);
    }
}