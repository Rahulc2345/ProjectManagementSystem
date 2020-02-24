import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: string;

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:3000/routes/user/login', { username, password })
      .pipe(
      map(
        userData => {
          this.currentUser = username;
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('role', userData.role)
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('userId', userData.id);
          //  console.log(tokenStr);
          return userData;
        }
      )

      );
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('token')
  }
}
