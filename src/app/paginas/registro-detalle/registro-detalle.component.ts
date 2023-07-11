import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
@Component({
  selector: 'app-registro-detalle',
  templateUrl: './registro-detalle.component.html',
  styleUrls: ['./registro-detalle.component.css']
})
export class RegistroDetalleComponent implements OnInit {
 id:string;
 producto:Producto;

constructor(private route:ActivatedRoute, private productoService:ProductoService){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.producto = new Producto();
    this.productoService.obtenerProducto(this.id).subscribe(
      x =>{
        this.producto = x;
      }
    )
  }

 ObtenerProducto(){
  
 }
  
}
