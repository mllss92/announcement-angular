import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout();
  }

  getUserNickName(): string {
    return this.authService.getUserNickName();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
