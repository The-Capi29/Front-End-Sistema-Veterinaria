import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

const url = AppSettings.url + "/atencion";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  
constructor(private http: HttpClient) { }

listadoCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>( url + '/listCustomers' );
  }
registrar(obj:Cliente):Observable<any>{
  return this.http.post(url + '/insertCustomers', obj);
}

deleteCustomers(id_cliente:string): Observable<any>{
 
  return this.http.delete(url + '/eliminaCliente/'+ id_cliente);
}
updateCustomers(cliente: Cliente): Observable<any> {
  return this.http.put(url + '/updateCustomers/' + cliente.id_cliente, cliente);
}
}
