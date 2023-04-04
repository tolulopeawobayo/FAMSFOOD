import { Injectable } from '@angular/core';

import { SystemConstant } from './constant';
import * as crypto from 'crypto-js';
import { JsonPipe } from '@angular/common';

@Injectable()
export class SharedDataService {
  private dataHolder: any = {};

  constructor() { }

  private encryptData(unEncryptedData: string | crypto.lib.WordArray) {
    return crypto.AES.encrypt(unEncryptedData, SystemConstant.ENCRYPTIONSECRETKEY).toString();
  }

  private decryptData(encryptedData: string | null) {
    return crypto.AES.decrypt(encryptedData!.toString(), SystemConstant.ENCRYPTIONSECRETKEY).toString(crypto.enc.Utf8);
  }

  public persistData(key: string, encryptedNumber: string | crypto.lib.WordArray) {
    const data = this.encryptData(encryptedNumber);
    sessionStorage.setItem(key, data);
  }

  public removePersitedData(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  public clearPersitedData(): void {
    window.sessionStorage.clear();
  }

  public getPersistedData(key: string) {
    if (sessionStorage.getItem(key)) {
      return this.decryptData(sessionStorage.getItem(key));
    } else {
      return 'false';
    }
  }

  private removePersistedData(key: string) {
    return sessionStorage.removeItem(key);
  }

  keepData(key: string, sharedData: any): void {


    if (key === 'token') {
      return this.persistData('_Iamstupidtobecheckingthis_', sharedData);
    }

    if (key === 'userData') {
      return this.persistData('_whatareyoulookingfor_', JSON.stringify(sharedData));
    }



    this.dataHolder[key] = sharedData;
  }

  public getUser() {
    return JSON.parse(this.getPersistedData('userinfo'));
  }

  public getData(key: string) {

    // Here Can choose What name to use to persist specific data so that when its inspected
    // in the console, the purpose of the entry will not be known

    if (key === 'token') {
      return this.getPersistedData('_Iamstupidtobecheckingthis_');
    }

    if (key === 'userData') {
      return this.getPersistedData('_whatareyoulookingfor_') ?
        JSON.parse(this.getPersistedData('_whatareyoulookingfor_')) : false;
    }

    return key ? this.dataHolder[key] : this.dataHolder;
  }

  removeData(key?: string | number) {
    if (key) {
      delete this.dataHolder[key];
    } else {
      this.dataHolder = {};
    }
  }

  checkValue(event: { target: { value: any; }; keyCode: number; charCode: any; key: string; keyIdentifier: string; }, dataLength?: number) {
    const { value } = event.target;
    const key = event.keyCode > 0 ? event.keyCode : event.charCode;

    if (key === 8 || key === 44 || key === 46 || key >= 37 && key <= 40 || key >= 48 && key <= 57) {
      // Prevent characters %, &, (, and ' on Chrome, Firefox & Opera browsers
      if (key >= 37 && key <= 40 && (event.key === '%' || event.key === '&' || event.key === '(' || event.key === '\'')) {
        return false;
      }
      // Prevent characters %, &, (, and ' on Safari browser
      if (key >= 37 && key <= 40 && event.keyIdentifier === '') {
        return false;
      }
      // *** Firefox Bug fix *** This allows the user to still be able to use arrow keys and backspace when the maxlength is reached
      if (key === 8 || key >= 37 && key <= 40) {
        return true;
      }
      return dataLength ? !(value.length > (dataLength - 1)) : true;
    }
    return false;
  }



}

