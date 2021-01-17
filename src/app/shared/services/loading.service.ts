import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading = false;

  constructor() { }

  getLoading(): boolean {
    return this.isLoading;
  }
  turnOn(): void {
    setTimeout(() => {
      this.isLoading = true;
    });
  }
  turnOff(): void {
    setTimeout(() => {
      this.isLoading = false;
    });
  }
}
