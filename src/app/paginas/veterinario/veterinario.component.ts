import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/models/veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.css'],


})

export class VeterinarioComponent implements OnInit {
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Celular', 'especialidad', 'Acción'];
  dataSource = new MatTableDataSource<Veterinario>;
  veterinarios: Veterinario[];
  veterinario = new Veterinario();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private veteriarioService: VeterinarioService, private router: Router) {

  }

  ngOnInit() {
    this.listaVeterinario();
    this.dataSource = new MatTableDataSource<Veterinario>();
  }
  listaVeterinario() {
    this.veteriarioService.listarVeterinario().subscribe(
      x => {
        this.dataSource.data = x;
        this.dataSource.paginator = this.paginator;
        console.log(x);
      }
    )
  }
  guardar() {
    this.veteriarioService.RegistroVeterinario(this.veterinario).subscribe(
      x => {
        Swal.fire(
          'Mensaje', x.mensaje, 'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.ngOnInit();
          }
        });

      }
    );
  }
  busca(obj:Veterinario){
    this.veterinario= obj;
  }
  actualizar(){
    this.veteriarioService.ActualizaVeterinario(this.veterinario).subscribe(
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

  eliminar(id_veterinario?: string): void {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina ',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (id_veterinario) {
          this.veteriarioService.EliminaVeterinario(id_veterinario).subscribe(
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
