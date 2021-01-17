import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toasterService: ToasterService
  ) { }

  error(err: HttpErrorResponse): void {
    if (err.error === 'Unauthorized') {
      this.toasterService.error('Token is expired. Please sign in!');
    } else {
      this.toasterService.error(err.error.message ?? err.message);
    }
  }
}
