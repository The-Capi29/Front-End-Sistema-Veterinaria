import { Component, OnInit,ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { Cliente } from 'src/app/models/cliente';
import { PacienteService } from 'src/app/service/paciente.service';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent  implements OnInit{
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Especie', 'Sexo', 'Peso','Acción'];
  dataSource = new MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  id_paciente:string="";
  pacientes: Paciente[];
  clientes: Cliente[];

  paciente: Paciente = {
    id_paciente:"",
    apodo:"",
    edad:"",
    especie:"",
    raza:"",
    sexo:"",
    tamano:0,
    peso:0,
    fechaNacimiento:"",
    cliente: {
      id_cliente: "",
      nombres: "",
      apellidos: "",
      direccion: "",
      celular: "",
      correo: "",
      dni: "",
      fechaRegistro: "",
      estado: true
    }
  };
  constructor(private pacienteserv: PacienteService, private router: Router, private clienteService:CustomerServiceService,  public loginService: LoginService){
    this.clienteService.listadoCliente().subscribe(
      x=>this.clientes = x
    );
  }

  ngOnInit(){
    this.listadoPaciente();
    this.dataSource = new MatTableDataSource<Paciente>();
  }

  listadoPaciente(){
    this.pacienteserv.listadoPaciente()
    .subscribe(
      data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        console.log(data)
      }
    )
  }
  limpiarInputs() {
    this.paciente = {
      id_paciente: "",
      apodo: "",
      edad: "",
      especie: "",
      raza: "",
      sexo: "",
      tamano: 0,
      peso: 0,
      fechaNacimiento: "",

      cliente: new Cliente()
    };
  }
  
  guardar(){
    this.pacienteserv.registrarPaciente(this.paciente).subscribe(
      x => {
        Swal.fire(
          'Mensaje',x.mensaje,'success'
        ).then((result)=>{
          if (result.isConfirmed){
            this.ngOnInit();
          }
        });
      }
    );
  }

  busca(obj:Paciente){
    this.paciente=obj;
  }
  buscarProducto(id:string) {
    this.router.navigate(['perfil-paciente', id])
  }

  actualizar(){
    this.pacienteserv.updatePaciente(this.paciente).subscribe(
      x => {
        Swal.fire(
          'Mensaje', x.mensaje, 'success'
        ).then((result)=>{
          if(result.isConfirmed){
            this.ngOnInit();
          }
        });
      }
    );
  }

  eliminar(id_paciente?: string): void {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: 'Los cambios no se van a revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        if(id_paciente){
          this.pacienteserv.deletePaciente(id_paciente).subscribe(
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
