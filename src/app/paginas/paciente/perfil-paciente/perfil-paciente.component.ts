import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/service/paciente.service';


@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css']
})
export class PerfilPacienteComponent implements OnInit {
  id:string;
  paciente:Paciente;
  constructor(private route:ActivatedRoute, private pacienteService:PacienteService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.paciente = new Paciente();
    this.pacienteService.obtenerPaciente(this.id).subscribe(
      x =>{
        this.paciente = x;
      }
    )
  }
}
