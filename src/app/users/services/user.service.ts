import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public ApiService: RestApiService) { }

  public getOne(url: any, id: any): Observable<any> {

    return this.ApiService.request(url + '/' + id, 'get', '', true)

  }

  public getAll(url: any): Observable<any> {

    return this.ApiService.request(url, 'get', '', true)

  }

  public create(url: any, payload: any): Observable<any> {

    return this.ApiService.request(url, 'post', payload, true)

  }

  public update(url: any, payload: any): Observable<any> {

    return this.ApiService.request(url, 'put', payload, true)

  }

  public delete(id: any, url: any): Observable<any> {

    return this.ApiService.request(url + '/' + id, 'delete', '', true)

  }
}
