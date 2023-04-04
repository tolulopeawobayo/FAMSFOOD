import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public ApiService: RestApiService) { }

  public getOne(url: any, id: any): Observable<any> {

    return this.ApiService.request(url + '/' + id, 'get', false)

  }

  public getAll(url: any): Observable<any> {

    return this.ApiService.request(url, 'get', false)

  }

  public create(url: any, payload: any): Observable<any> {

    return this.ApiService.request(url, 'post', payload, false)

  }

  public update(url: any, payload: any): Observable<any> {

    return this.ApiService.request(url, 'put', payload, false)

  }

  public delete(id: any, url: any): Observable<any> {

    return this.ApiService.request(url + '/' + id, 'delete', false)

  }
}
