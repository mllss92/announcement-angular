import { LoadingService } from './shared/services/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  test!: string;

  constructor(
    private loadingService: LoadingService
  ) { }

  getLoadingStatus(): boolean {
    return this.loadingService.getLoading();
  }
}
