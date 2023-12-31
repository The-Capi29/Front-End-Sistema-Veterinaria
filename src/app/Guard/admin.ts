import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  RouterStateSnapshot, UrlTree , Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';



@Injectable({
    providedIn: 'root'
  })
export class Admin implements CanActivate{

    constructor(private loginService:LoginService,private router:Router){

    }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        if(this.loginService.isLoggedIn() && this.loginService.getUserRoles() == 'ADMIN'){
          return true;
        }
           
        this.router.navigate(['', 'login'])
    
        return false;
    }
}
