import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

/*
This service provide local storage functionality 
to store token and user data. It will be used inside
the TokenStorageService.
Local storage is client-side storage for web applications.
It stays there as long as it's not cleared—unlike session storage, 
which lasts for the current browser tab session. 
Local storage provides up to 5MB of storage, allocated 
separately for each domain. For example, local storage for 
the website www.abc.com will be different from www.xyz.com.

For crypting data:
npm install --force crypto-js
npm i --force --save-dev @types/crypto-js

Reference:
https://blog.jscrambler.com/working-with-angular-local-storage/
*/

export class LocalStorageServiceService {

  key = "9Y@!.kJh54Fd#_t9£2X-";  // encrypt key

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key)|| "";
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}