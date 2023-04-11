import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface StatusResponse{
  status: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})

export class StatusMessageService {
  status: Subject<StatusResponse> = new Subject();

  constructor() { 
    // this.status = new BehaviorSubject<StatusResponse>({status: false, message: ''});
  }
  
  get onStatus$(): Observable<StatusResponse>{
    return this.status.asObservable();
  }

  statusListener(): Observable<StatusResponse> {
    return this.status.asObservable();
  }

  onStatus(response: StatusResponse) {  
    
  }

  pushStatus(response: StatusResponse){
    this.status.next(response);
  }

}
