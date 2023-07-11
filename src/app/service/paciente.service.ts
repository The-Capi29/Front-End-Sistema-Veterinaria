import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente';

const url = AppSettings.url + "/atencion";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  getTotalPaciente(): Observable<number> {
    return this.http.get<number>(url + '/total');
  }
  listadoPaciente():Observable<Paciente[]>{
    return this.http.get<Paciente[]>(url + '/listPaciente');
  }

  registrarPaciente(obj:Paciente):Observable<any>{
    return this.http.post(url + '/insertPaciente',obj);
  }

  updatePaciente(paciente:Paciente):Observable<any>{
    return this.http.put(url + '/updatePaciente/'+paciente.id_paciente,paciente);
  }

  deletePaciente(id_paciente:String):Observable<any>{
    return this.http.delete(url + '/eliminaPaciente/'+id_paciente);
  }

  buscarCliente(dni:String):Observable<Cliente>{
    return this.http.get(url + '/BuscarCliente/' + dni);
  }
  obtenerPaciente( id_paciente:string):Observable<any>{
    return this.http.get( url + '/obtener/'+id_paciente );
  }

}
