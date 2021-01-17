import { catchError, tap, takeWhile } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { PaginationData } from './../models/pagination-data';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { Post } from './../models/post';

@Injectable()
export class PostsService {

  constructor(
    private http: HttpClient,
    private httpErrorHandler: ErrorHandlerService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  createPost(data: { title: string, text: string }): Observable<boolean> {
    this.loadingService.turnOn();
    const { title, text } = data;
    const userNickName = this.authService.getUserNickName();
    const userId = this.authService.getUserId();
    const reqBody = { title, text, userNickName, userId, };
    return this.http.post<boolean>(`${environment.BEUrl}/api/post/create`, reqBody).pipe(
      tap(() => this.loadingService.turnOff()),
      catchError(err => {
        this.loadingService.turnOff();
        this.httpErrorHandler.error(err);
        return of(false);
      }),
      takeWhile(val => !!val),
    );
  }

  getPostsUsingPagination(paginationData: PaginationData): Observable<{ postsList: Post[], length: number } | boolean> {
    this.loadingService.turnOn();
    return this.http.post<{ postsList: Post[], length: number }>(`${environment.BEUrl}/api/post/get-using-pagination`, paginationData).pipe(
      tap(() => this.loadingService.turnOff()),
      catchError(err => {
        this.loadingService.turnOff();
        this.httpErrorHandler.error(err);
        return of(false);
      }),
      takeWhile(val => !!val),
    );
  }

  getPostByKeywords(paginationData: PaginationData, keyword: string): Observable<{ postsList: Post[], length: number } | boolean> {
    this.loadingService.turnOn();
    const reqBody = { paginationData, keyword };
    return this.http.post<{ postsList: Post[], length: number }>(`${environment.BEUrl}/api/post/get-by-keyword`, reqBody).pipe(
      tap(() => this.loadingService.turnOff()),
      catchError(err => {
        this.loadingService.turnOff();
        this.httpErrorHandler.error(err);
        return of(false);
      }),
      takeWhile(val => !!val),
    );
  }

  getPostById(id: string): Observable<Post | boolean> {
    this.loadingService.turnOn();
    return this.http.get<Post>(`${environment.BEUrl}/api/post/get-by-id${id}`).pipe(
      tap(() => this.loadingService.turnOff()),
      catchError(err => {
        this.loadingService.turnOff();
        this.httpErrorHandler.error(err);
        return of(false);
      }),
      takeWhile(val => !!val),
    );
  }

  getSimilarPosts(id: string): Observable<Post[] | boolean> {
    this.loadingService.turnOn();
    return this.http.get<Post[]>(`${environment.BEUrl}/api/post/get-similars${id}`).pipe(
      tap(() => this.loadingService.turnOff()),
      catchError(err => {
        this.loadingService.turnOff();
        this.httpErrorHandler.error(err);
        return of(false);
      }),
      takeWhile(val => !!val),
    );
  }

  deletePost(id: string): Observable<boolean> {
    this.loadingService.turnOn();
    return this.http.post<boolean>(`${environment.BEUrl}/api/post/delete`, { id }).pipe(
      tap(() => this.loadingService.turnOff()),
      catchError(err => {
        this.loadingService.turnOff();
        this.httpErrorHandler.error(err);
        return of(false);
      }),
      takeWhile(val => !!val),
    );
  }

  editPost(post: Post): Observable<Post | boolean> {
    this.loadingService.turnOn();
    return this.http.patch<Post>(`${environment.BEUrl}/api/post/edit`, post).pipe(
      tap(() => this.loadingService.turnOff()),
      catchError(err => {
        this.loadingService.turnOff();
        this.httpErrorHandler.error(err);
        return of(false);
      }),
      takeWhile(val => !!val),
    );
  }
}
