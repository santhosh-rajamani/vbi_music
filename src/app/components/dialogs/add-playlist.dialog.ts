import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { playlist } from "src/app/models/playlist.models";

@Component({
    selector: 'add-playlist-dialog',
    templateUrl: 'add-playlist.dialog.html',
})
export class AddPlayListDialog {

    constructor(
        public dialogRef: MatDialogRef<AddPlayListDialog>,
        @Inject(MAT_DIALOG_DATA) public data: playlist) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}