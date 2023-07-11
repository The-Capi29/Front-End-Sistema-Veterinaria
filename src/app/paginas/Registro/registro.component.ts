import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProductoService } from 'src/app/service/producto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Stock', 'Precio', 'Acción'];
  dataSource = new MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  productos: Producto[];
  lstCategoria: Categoria[];
  producto: Producto = {
    categoria: {
      id_categoria: -1,
      nombre: "",
      fechaRegistro: "",
      estado: true
    }
  }
 
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private router:Router) {
   this.listadoCegoria();
  }



  ngOnInit() {
    this.listadoProducto();
  }

  listadoProducto() {
    this.productoService.listaProducto().subscribe(dato => {

      this.dataSource.data = dato;
      this.dataSource.paginator = this.paginator;
      console.log(dato)
    }
    )
  }
  listadoCegoria(){
    this.categoriaService.listaCategoria()
    .subscribe(
      data => {
        this.lstCategoria = data;
        console.log(data)
      }
    )
  }

  registroProducto() {
    this.productoService.insertProducto(this.producto).subscribe(
      x => {
        Swal.fire('PRODUCTO GUARDADO', x.mensaje, 'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.ngOnInit();
          }
        });
      }

    );
  }

  buscarProducto(id:string) {
    this.router.navigate(['detalle-producto', id])
  }

  actualizarProducto() {
    this.productoService.actualizarProducto(this.producto).subscribe(
      x => {
        Swal.fire(
          'PRODUCTO ACTUALIZADO', x.mensaje, 'success'
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

      }
    );
  }

  eliminarProducto(id_producto?: string): void {
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (id_producto) {
          this.productoService.eliminarProducto(id_producto).subscribe(
            data => {
              this.ngOnInit();

              Swal.fire('Mensaje', data.mensaje, 'success');
            },
          )
        }
      }
    })
  }

}