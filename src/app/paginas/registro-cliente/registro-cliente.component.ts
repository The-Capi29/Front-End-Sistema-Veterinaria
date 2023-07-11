import { Component, OnInit,ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { LoginService } from 'src/app/service/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Apellido', 'N° DNI', 'Acción'];
  dataSource = new MatTableDataSource<Cliente>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  id_cliente:string="";
  clientes: Cliente[];
  cliente: Cliente = {
        id_cliente: "",
        nombres: "",
        apellidos: "",
        direccion: "",
        celular: "",
        correo: "",
        dni: "",
        fechaRegistro: "",
        estado: true
  };
  roles:string[];
  isAdmin = false;

  constructor(
    private clienteserv: CustomerServiceService,

    private router: Router, 
    public loginService:LoginService
    
    ) { }

  ngOnInit() {
    this.listadoCustomers();

    this.roles = this.loginService.getUserRoles();

    this.roles.forEach(rol => {
      if (rol === 'ADMIN') {
        this.isAdmin = true;
      }
      
    });

  }
  listadoCustomers() {
    this.clienteserv.listadoCliente()
      .subscribe(
        data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          
        }
      )
  }
  guardar() {
    this.clienteserv.registrar(this.cliente).subscribe(
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

  /* ========METODO PARA BUSCAR =========== */
  busca(obj:Cliente){
    this.cliente= obj;
  }
  /*========FIN PARA METODO BUSCAR ========= */
/* =======METODO PARA ACTUALIZAR ==============*/

actualizar(){
  this.clienteserv.updateCustomers(this.cliente).subscribe(
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




/* =======FIN METODO PARA ACTUALIZAR ==============*/


  /*======= METODO ELIMINAR =========== */
  eliminar(id_cliente?: string): void {
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
        if (id_cliente) {
          this.clienteserv.deleteCustomers(id_cliente).subscribe(
            data => {
              this.listadoCustomers();

              Swal.fire('Mensaje', data.mensaje, 'success');
            },
          )
        }
      }
    })
  }
  /*===== FIN DEL METODO ELIMINAR =========== */

}





