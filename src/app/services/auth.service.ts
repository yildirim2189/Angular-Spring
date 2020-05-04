import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// API AUTHENTICATION PATH
const AUTH_API = "http://localhost:8084/api/auth/";
// HTTP HEADER
const httpOptions = {
  headers: new HttpHeaders({'Content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // Send login request.
  login(credentials): Observable<any>{
    return this.httpClient.post(AUTH_API + 'login',{
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  // Send signup request.
  register(user): Observable<any>{
    return this.httpClient.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  /* Kullanılmıyor şu an. */
  checkIfUsernameExist(username: string){
    return this.httpClient.get(AUTH_API + 'username/' + username);
  }
}
