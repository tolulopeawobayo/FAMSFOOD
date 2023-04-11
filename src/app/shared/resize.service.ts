import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export interface size{
  modal_size: string;
  boot_size?: string;
  css: string;
}

@Injectable({
  providedIn: 'root'
})

export class ResizeService {

  currentsize = {} as size;
  get onResize$(): Observable<size> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }

  private resizeSubject: BehaviorSubject<size>;

  constructor() {
    this.resizeSubject = new BehaviorSubject(this.currentsize);
  }

  onResize(sizes: size) {
    this.currentsize = sizes;
    this.resizeSubject.next(sizes);
  }
}
