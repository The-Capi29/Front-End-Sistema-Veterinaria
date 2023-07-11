import { Component, OnInit,ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent  implements OnInit{
  displayedColumns: string[] = ['Codigo', 'Descripcion',  'Acción'];
  dataSource = new MatTableDataSource<Categoria>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  id_categoria:number;
  categorias: Categoria[];
  categoria: Categoria = {
        id_categoria:-1,
        nombre: "",
        fechaRegistro: "",
        estado: true
  };
  constructor(private categoriaserv: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.listadoCategorias();

  }
  listadoCategorias() {
    this.categoriaserv.listaCategoria()
      .subscribe(
        data => {
          this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
        }
      )
  }

  registroCategoria() {
    this.categoriaserv.insertCategoria(this.categoria).subscribe(
      x => {
        Swal.fire(
          'Mensaje', x.mensaje, 'success'
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

      }
    );
  }

  busca(obj:Categoria){
    this.categoria= obj;
  }
  
  actualizar(){
    this.categoriaserv.updateCategoria(this.categoria).subscribe(
      x => {
        Swal.fire(
          'Mensaje', x.mensaje, 'success'
        ).then((result) => {
          if (result.isConfirmed) {
             window.location.reload();
          }
        });

      }
    );
  }

  

  eliminarCategoria(id_categoria?: number): void {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (id_categoria) {
          this.categoriaserv.deleteCategoria(id_categoria).subscribe(
            data => {
              this.listadoCategorias();

              Swal.fire('Mensaje', data.mensaje, 'success');
            },
          )
        }
      }
    })
  }
  
}
