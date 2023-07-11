import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Usuario } from '../models/Usuario';


const url = AppSettings.url+'/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  registroUsuario(obj:Usuario):Observable<any>{
    return this.http.post(url + '/registroUsuario', obj);
  }

  getTotalUsuario(): Observable<number> {
    return this.http.get<number>(url + '/total');
  }
}
