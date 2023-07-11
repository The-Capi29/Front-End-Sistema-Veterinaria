import { Categoria } from "./categoria";

export class Producto {
    id_producto?:string;
    nombre?:String;
    descripcion?:String;
    stock?:number;
    categoria:Categoria;
    precio?:Number;
    estado?:boolean;
    fechaRegistro?:Date;
    
}
