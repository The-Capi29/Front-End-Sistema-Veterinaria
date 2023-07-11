import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Veterinario } from '../models/veterinario';

const url = AppSettings.url + "/veterinario";


@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  constructor(private http:HttpClient) { }


listarVeterinario():Observable<Veterinario[]>{
  return this.http.get<Veterinario[]>(url + '/listVeterinario');
}
 RegistroVeterinario(obj:Veterinario):Observable<any>{
  return this.http.post(url + '/registro-veterinario', obj);
 }

 ActualizaVeterinario( obj:Veterinario):Observable<any>{
  return this.http.put( url + '/updateVeterinario/' + obj.id_veterinario, obj) ;
}

 EliminaVeterinario(id_veterinario:string): Observable<any>{
   
  return this.http.delete(url + '/eliminaVeterinario/'+ id_veterinario);
}
}
