import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  RouterStateSnapshot, UrlTree , Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
    providedIn: 'root'
  })
export class Roles implements CanActivate{
    constructor(private loginService:LoginService,private router:Router){
    }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.loginService.isLoggedIn() && this.loginService.getUserRoles() == 'ADMIN'){
          return true;
        }else if (this.loginService.isLoggedIn() && this.loginService.getUserRoles() === 'VETERINARIO') {
            const allowedRoutes = ['cliente', 'cita', 'producto', 'veterinario', 'paciente','categoria','perfil', 'servicio', 'perfil-paciente', 'detalle-producto/:id', ];
            const requestedRoute = state.url.split('/')[1]; // Obtener la ruta solicitada del estado de la URL
            if (allowedRoutes.includes(requestedRoute)) {
              return true; // El usuario tiene el rol de VETERINARIO y la ruta solicitada está permitida
            } else {
              // Redireccionar a una página de acceso denegado u otra ruta de tu elección
              this.router.navigate(['', 'login'])
              return false;
            }
          } else {
            // Redireccionar a una página de acceso denegado u otra ruta de tu elección
            this.router.navigate(['', 'login'])
            return false;
          }
        return false;
    }
}
