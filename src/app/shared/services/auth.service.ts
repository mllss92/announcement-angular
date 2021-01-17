import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, takeWhile, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { LoadingService } from './loading.service';
import { User } from './../models/user';
import { LoginData } from './../models/login-data';
import { RegistrationData } from './../models/registration-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authorizedUser: User = {
    email: JSON.parse(localStorage.getItem('email') as string),
    _id: JSON.parse(localStorage.getItem('_id') as string),
    nickName: JSON.parse(localStorage.getItem('nickName') as string),
    token: JSON.parse(localStorage.getItem('token') as string),
  };

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private httpErrorHandler: ErrorHandlerService,
    private router: Router,
  ) { }

  login(data: LoginData): Observable<User | boolean> {
    this.loadingService.turnOn();
    return this.http.post<User>(`${environment.BEUrl}/api/auth/login`, data).pipe(
      tap(() => this.loadingService.turnOff()),
      catchError((err) => {
        this.loadingService.turnOff();
        this.httpErrorHandler.error(err);
        return of(false);
      }),
      takeWhile(val => !!val),
    );
  }

  registration(data: RegistrationData): Observable<boolean> {
    this.loadingService.turnOn();
    return this.http.post<boolean>(`${environment.BEUrl}/api/auth/register`, data).pipe(
      tap(() => this.loadingService.turnOff()),
      catchError((err) => {
        this.loadingService.turnOff();
        this.httpErrorHandler.error(err);
        return of(false);
      }),
      takeWhile(val => !!val),
    );
  }

  isLoggedIn(): boolean {
    return !!this.authorizedUser.token;
  }

  getUserNickName(): string {
    return this.authorizedUser.nickName;
  }

  getUserId(): string {
    return this.authorizedUser._id;
  }

  getToken(): string {
    return this.authorizedUser.token;
  }

  addUserToLocalStorage(user: any): void {
    for (const key in user) {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        const value = user[key];
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }

  setAuthorizedUser(user: User): void {
    this.authorizedUser = user;
  }

  logout(): void {
    localStorage.clear();
    this.setAuthorizedUser({ email: '', _id: '', token: '', nickName: '', });
    this.router.navigate(['main']);
  }

}
