import { Paciente } from "./paciente";
import { Servicio } from "./servicio";
import { Veterinario } from "./veterinario";

export class Boleta {
    id_cita:string;
    fecha_atencion:string;
    descripcion:string;
    costo:number;
    paciente:Paciente;
    veterinario:Veterinario;
    servicio:Servicio;
}
