import { Component , OnInit} from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Cliente } from 'src/app/models/cliente';
import { Producto } from 'src/app/models/producto';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { ProductoService } from 'src/app/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent implements OnInit{
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

  }
  
  id_producto:string="";
  productos: Producto[];
  producto: Producto = {
        id_producto: "",
        nombre: "",
        descripcion: "",
        stock: 0,
        precio:0,
        categoria:  new Categoria,
        
  }

  id_categoria:string="";
  categorias: Categoria[];
  categoria: Categoria = {
        id_categoria: 1,
        nombre: "",
        fechaRegistro: "",
        estado: true,
        
        
  };
  constructor(private clienteserv: CustomerServiceService, private productoserv: ProductoService,private router: Router) { }

  ngOnInit() {
    this.listadoCustomers();
    this.listadoProductos();
  }


  listadoProductos() {
    this.productoserv.listaProducto()
      .subscribe(
        data => {
          this.productos = data;
          console.log(data,2)
        }
      )
  }
  listadoCustomers() {
    this.clienteserv.listadoCliente()
      .subscribe(
        data => {
          this.clientes = data;
          console.log(data)
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
            this.ngOnInit();
          }
        });

      }
    );
  }

  busca(obj:Cliente){
    this.cliente= obj;
  }

  buscarCliente() {
    const codigo = this.cliente.id_cliente;
    
    // Restablecer el objeto cliente a su estado inicial
    this.cliente = {
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
    
    // Buscar el cliente en la lista de clientes
    const clienteEncontrado = this.clientes.find(cliente => cliente.id_cliente === codigo);
    
    if (clienteEncontrado) {
      // Asignar los datos encontrados al cliente del formulario principal
      this.cliente = clienteEncontrado;
    } else {
      // Mostrar un mensaje de error si no se encuentra el cliente
      Swal.fire('Error', 'Cliente no encontrado', 'error');
    }
    
    
    
    // Actualizar la lista de clientes en la página principal
    this.listadoCustomers();
  }
  
}
