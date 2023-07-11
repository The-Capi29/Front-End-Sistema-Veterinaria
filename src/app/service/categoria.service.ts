import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';
const url = AppSettings.url + "/producto";


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor( private http: HttpClient) { }

  listaCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(url+"/lista-categiria");
  }
  insertCategoria(obj:Categoria):Observable<any>{
    return this.http.post(url + '/registro-categoria', obj);
  }
  
  deleteCategoria(id_categoria:number): Observable<any>{
   
    return this.http.delete(url + '/eliminar-categoria/'+ id_categoria);
  }
  updateCategoria( categoria:Categoria):Observable<any>{
    return this.http.put( url + '/updateCategoria/' + categoria.id_categoria, categoria) ;
  }
}
