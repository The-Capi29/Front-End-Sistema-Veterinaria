import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const url = AppSettings.jwt;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

public loginStatusSubjec = new Subject<boolean>();




  constructor(private http: HttpClient, private router:Router) { }

  //generemos el token 
  public generateToken(loginData: any) {
    return this.http.post(url + "/generate-token", loginData);
  }

  //iniciamos sesión  y establecemos el token en el localStorage

  public loginUser(token: any) {
    localStorage.setItem('token', token);

  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //creeeamos sesion y eliminamos el token del localStorge 
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
 
    return true;
  }

  //obtenemos el token

  public getToken(){
    return localStorage.getItem('token')
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user))
  }


public getUser(){
  let userStr = localStorage.getItem('user');
  if(userStr != null){
    return JSON.parse(userStr);
  }else{
    this.logout();
    return null;
  }
}

public getUserRoles(){
  let user = this.getUser();
  return user.authorities[0].authority;
}

//obtener el actual usuario
public getCurrentUser(){
  return this.http.get (url + "/actual-usuario");
}

}
