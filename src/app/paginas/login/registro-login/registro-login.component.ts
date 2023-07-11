import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-registro-login',
  templateUrl: './registro-login.component.html',
  styleUrls: ['./registro-login.component.css']
})
export class RegistroLoginComponent implements OnInit{

   user:Usuario = {
    username : "",
    password : '',
    name : '',
    lastname : '',
    email : '',
    phone : ''
  }

  constructor (private userService: UsuarioService){


  };

  ngOnInit() {
   
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'EL campo de USUARIO esta vacío!'
      })
      return;
    }

    this.userService.registroUsuario(this.user).subscribe(
      x => {
        Swal.fire(
          'Registro exitoso', x.mensaje, 'success'
        ).then((result) => {
          if (result.isConfirmed) {
            
          }
        });

      }
    )
  }
  
}
