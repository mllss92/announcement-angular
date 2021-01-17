import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private options: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  constructor(private toaster: MatSnackBar) { }

  success(message: string): void {
    this.options.panelClass = 'toaster-success';
    this.toaster.open(message, '', this.options);
  }

  error(message: string): void {
    this.options.panelClass = 'toaster-error';
    this.toaster.open(message, '', this.options);
  }
}
