import { Cliente } from "./cliente";

export class Paciente {
    id_paciente?:string;
    apodo?:string;
    edad?:string;
    especie?:string;
    raza?:string;
    sexo?:string;
    tamano?:Number;
    peso?:Number;
    fechaNacimiento:string;
    cliente:Cliente;
}
