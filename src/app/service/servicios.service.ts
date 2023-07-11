import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Servicio } from '../models/servicio';
import { Observable } from 'rxjs';
const url = AppSettings.url + "/atencion";


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }


  listaServicio(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(url + "/lista-servicio");
  }

  InsertaServicio(obj: Servicio): Observable<any> {
    return this.http.post(url + '/registro-servicio', obj);
  }

  updateServicio(servicio: Servicio): Observable<any> {
    return this.http.put(url + '/updateServicio/'+servicio.id_servicio, servicio);
  }

  deleteServicio(id_servicio: string): Observable<any> {

    return this.http.delete(url + '/eliminaServicio/' + id_servicio);
  }
}
