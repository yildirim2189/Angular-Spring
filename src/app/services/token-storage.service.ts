import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // Clear Browser Session
  signOut(){
    window.sessionStorage.clear();
  }

  // Save Token
  public saveToken(token : string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  // Get Token
  public getToken() : string{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // Save User
  public saveUser(user){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Get User
  public getUser(){
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
