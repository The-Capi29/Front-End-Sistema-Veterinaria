import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/cliente';
import { Paciente } from 'src/app/models/paciente';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { PacienteService } from 'src/app/service/paciente.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {

  displayedColumns: string[] = ['Codigo', 'Nombre', 'Apellidos', 'Correo','Seleccionar'];
  dataSource = new MatTableDataSource<Cliente>;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  ngOnInit(): void {
    this.listadoCliente();
  }

  customers: Cliente[];

  id_cliente: string;
  nombres: string;
  apellidos: string;
  correo: string;

  paciente: Paciente = {
    id_paciente: "",
    apodo: "",
    edad: "",
    especie: "",
    raza: "",
    sexo: "",
    tamano: 0,
    peso: 0,
    fechaNacimiento: "",
    cliente: {
      id_cliente: ""
    }
  };
  
  constructor(
    private pacienteserv: PacienteService,
    private clienteService: CustomerServiceService, 
    private router: Router, 
    private modalService: NgbModal,
    public loginService: LoginService

    ) {


    this.clienteService.listadoCliente().subscribe(
      x => this.customers = x
    );
  }



  guardar() {
    this.paciente.cliente.id_cliente = this.id_cliente;
    this.pacienteserv.registrarPaciente(this.paciente).subscribe(
      x => {
        Swal.fire(
          'Mensaje', x.mensaje, 'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.ListadoPaciente();
          }
        });
      }
    );
  }
  listadoCliente() {
     this.clienteService.listadoCliente().subscribe(
      x => {
        this.dataSource.data = x;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  ListadoPaciente() {
    this.router.navigate(['/paciente'])
  }



  llenarCampos(item: any) {
    this.modalService.dismissAll();
    this.id_cliente = item.id_cliente;
    this.nombres = item.nombres;
    this.apellidos = item.apellidos;
    this.correo = item.correo;

  }

}
