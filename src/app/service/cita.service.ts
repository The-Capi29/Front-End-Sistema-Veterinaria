import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citas } from '../models/citas';

const url = AppSettings.url + "/atencion";
@Injectable({
  providedIn: 'root'
})
export class CitaService{

  constructor( private http: HttpClient) { }


  registroCita(obj:Citas): Observable<any>{
    return this.http.post(url + '/registro-cita', obj);
  }


}
