import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('userInput'));
    return token.sum === token.value;
  }
}
