import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoints } from 'src/app/shared/constant';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public ApiService: RestApiService) { }

  public login(loginDetails: any): Observable<any> {
    const endpoint = EndPoints.ONBOARDING;


    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('username', loginDetails.username);
    urlSearchParams.set('password', loginDetails.password);
    let body = urlSearchParams.toString();

    return this.ApiService.request(endpoint + '/login', 'post', body, false)

  }

  public register(details: any): Observable<any> {
    const endpoint = EndPoints.ONBOARDING;


    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('firstName', details.firstName);
    urlSearchParams.set('lastName', details.lastName);
    urlSearchParams.set('username', details.username);
    urlSearchParams.set('phoneNumber', details.phoneNumber);
    urlSearchParams.set('email', details.email);
    urlSearchParams.set('password', details.password);
    urlSearchParams.set('isValidated', details.isValidated);
    let body = urlSearchParams.toString();

    return this.ApiService.request(endpoint + '/registerUser', 'post', body, false)

  }

  public forgotPassword(email: any): Observable<any> {
    const endpoint = EndPoints.ONBOARDING;

    return this.ApiService.request(endpoint + '/forgotpassword/' + email, 'get', false)

  }

  public resetPassword(details: any): Observable<any> {
    const endpoint = EndPoints.ONBOARDING;


    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('email', details.email);
    urlSearchParams.set('password', details.password);
    urlSearchParams.set('otp', details.otp);
    let body = urlSearchParams.toString();

    return this.ApiService.request(endpoint + '/resetpassword', 'post', body, false)

  }
}
