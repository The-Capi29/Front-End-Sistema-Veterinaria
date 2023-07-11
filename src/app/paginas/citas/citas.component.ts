import { Component, OnInit  } from '@angular/core';
import { Veterinario } from 'src/app/models/veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from 'src/app/service/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { CitaService } from 'src/app/service/cita.service';
import { Citas } from 'src/app/models/citas';
import Swal from 'sweetalert2';
import { ServiciosService } from 'src/app/service/servicios.service';
import { Servicio } from 'src/app/models/servicio';






@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  
})
export class CitasComponent implements OnInit {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  

serviciocbo:Servicio[]=[];
veterinaria: Veterinario[];
paciente: Paciente[];
citas: Citas ={
  id_cita:"",
  fecha_atencion: "",
  descripcion: "",
  costo: 0.0,
  paciente: {
    id_paciente: "",
    fechaNacimiento:"",
    cliente:{id_cliente:""}
  },
  veterinario: {
    id_veterinario: ""
  },
  servicio: {
    id_servicio: ""
  },
  estado: true
  
};



constructor(
  private veterinariaService: VeterinarioService,
  private pacienteService: PacienteService,
  private citaService: CitaService,
  private servicioService:ServiciosService,
  private modalService: NgbModal,
  ){
    this.servicioService.listaServicio().subscribe(
      x => this.serviciocbo = x
    );
  }

  ngOnInit() {
   this.listadoVeterinaria();
   this.listadoPaciente();
  }

//para obtener los datos del veterinario
  id_veterinario:string;
  nombres:string;
  especialidad:string;

//para obtener los datos del paciente

    id_paciente:string;
    apodo:string;
    edad:string;
    especie:string;
    fechaNacimiento:Date;

listadoVeterinaria(){
  return this.veterinariaService.listarVeterinario().subscribe(
    x => {
      this.veterinaria = x;
      console.log(x);
    }
  )
}
listadoPaciente(){
  return this.pacienteService.listadoPaciente().subscribe(
    x => {
      this.paciente = x;
      console.log(x);
    }
  )
}

seleccionarFilaPaciente(item: any) {
  this.modalService.dismissAll();

 this.id_paciente = item.id_paciente;
 this.apodo = item.apodo;
 this.edad = item.edad;
 this.especie = item.especie;
 this.fechaNacimiento = item.fechaNacimiento;
}

seleccionarFila(item: any) {
   this.modalService.dismissAll();

  this.id_veterinario = item.id_veterinario;
  this.nombres = item.nombres;
  this.especialidad = item.especialidad;
}


/*Registro de las citas obteniendo metodo del service cita */

RegistroCita(){
  this.citas.paciente.id_paciente = this.id_paciente;
  this.citas.veterinario.id_veterinario = this.id_veterinario;

  this.citaService.registroCita(this.citas).subscribe(
    data =>{
      Swal.fire('CITA GUARDADO',data.mensaje,'success'
      ).then((result) => {
        if (result.isConfirmed) {
          this.ngOnInit();
        }
      });
    }
  )
  
}
/*
generarPDF() {
  const documentDefinition: pdfMake.Content ={
    content: [
      { text: 'Detalle de la cita', style: 'header' },
      { text: 'Descripción: ' + this.citas.descripcion },
      { text: 'Costo: ' + this.citas.costo },
      // Agrega aquí los demás datos de la cita que deseas incluir en el PDF
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10] // Margen inferior
      }
    }
  };

  pdfMake.createPdf(documentDefinition).open();
}

*/

}
