import { Component, OnInit, ViewChild  } from '@angular/core';
import { ServiciosService } from 'src/app/service/servicios.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Servicio } from 'src/app/models/servicio';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Acción'];
  dataSource = new MatTableDataSource<Servicio>;
  service:Servicio={
    id_servicio: "",
    nombre: "",
    fechaRegistro: "",
    estado: true
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){
    this.listadoServicio();
  }
  constructor(private servicio:ServiciosService){}


  listadoServicio(){
    this.servicio.listaServicio().subscribe(
      data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        
      }
    )
  }

  guardar(){
    this.servicio.InsertaServicio(this.service).subscribe(
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
  actualizar(){
    this.servicio.updateServicio(this.service).subscribe(
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
  
  busca(obj:Servicio){
    this.service=obj;
  }
  eliminar(id_servicio?: string): void {
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
        if (id_servicio) {
          this.servicio.deleteServicio(id_servicio).subscribe(
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
