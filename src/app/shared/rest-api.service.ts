import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  public httpOptions;
  public method;
  public service;
  public token;
  public header: HttpHeaders = new HttpHeaders;

  constructor(private http: HttpClient, private router: Router, private ds: SharedDataService) { }

  request(url: string, method: string, body?: any, useToken?: boolean, header?: any): Observable<any> {
    this.token = this.ds.getData('token');
    if (useToken == true) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token
        }),
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
      };
    }

    if (method.toLowerCase() == 'get') {
      this.service = this.http.get<any>(url, this.httpOptions);
    } else if (method.toLowerCase() == 'post') {
      this.service = this.http.post<any>(url, body, this.httpOptions);
    } else if (method.toLowerCase() == 'post') {
      this.service = this.http.put<any>(url, body, this.httpOptions);
    } else {
      this.service = this.http.delete<any>(url, this.httpOptions);
    }

    return this.service.pipe(retry(1), catchError(this.handleError));

  }

  handleError(error: any) {
    let errorMessage = '';
    let errorStatus: any;
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      errorStatus = error.status;

      if (errorStatus === 401) {
        let requestError = { reason: 'Session Expired', status: 'Your Session has expired' };
        if (errorMessage == 'TOKEN EXPIRED') {

        }
        if (errorMessage == 'Unauthorized Access') {
          requestError.reason = 'Unauthorised Access';
          requestError.status = 'You are not allowed to view this page';
        }
        sessionStorage.clear();
        this.router.navigate(['/login']);
        return throwError(() => requestError || 'Server Error');
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        let requestError = {};
        requestError = { reason: 'Network Error', status: 'Could not connect to server' };

        return throwError(() => requestError || 'Server Error');
      }
    }
    return throwError(() => {
      return errorMessage;
    });
  }

}
