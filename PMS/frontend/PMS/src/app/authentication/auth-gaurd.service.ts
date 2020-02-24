import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "src/app/authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{

  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
      if(this.authenticationService.isUserLoggedIn()){
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}
