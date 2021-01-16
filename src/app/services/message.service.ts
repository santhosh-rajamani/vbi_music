import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageDuration = 2000; //snackbar duration in ms

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string){
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
