import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

const apiurl = AppSettings.url + "/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  listaProducto():Observable<Producto[]>{

    return this.http.get<Producto[]>(apiurl+"/lista-producto" );
  }
  getTotalProductos(): Observable<number> {
    return this.http.get<number>(apiurl + '/total');
  }
  getTotalProductoschart(): Observable<any> {
    return this.http.get<any>(apiurl + '/home');
  }

  insertProducto(obj:Producto):Observable<any>{
    return this.http.post(apiurl+"/registro-producto", obj);
  }

  eliminarProducto(id_producto:string): Observable<any>{
    return this.http.delete(apiurl + '/eliminaProducto/'+ id_producto);
  }
  
  actualizarProducto( producto:Producto):Observable<any>{
    return this.http.put( apiurl + '/updateProducto/'+producto.id_producto, producto);
  }

  obtenerProducto( id_producto:string):Observable<any>{
    return this.http.get( apiurl + '/obtener/'+id_producto );
  }
}
