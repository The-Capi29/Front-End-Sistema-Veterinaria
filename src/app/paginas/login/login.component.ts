import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": '',
    "password": ''
  }
  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit(): void {

  }


  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'EL campo de usuario esta vacío!'
      })
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'EL campo de contraseña esta vacío!'
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
        this.loginService.setUser(user);
          console.log(user);
          if(this.loginService.getUserRoles()== "ADMIN"){
           window.location.href='cliente';
           window.location.href='producto';
           window.location.href='categoria';
           window.location.href='paciente';
           window.location.href='index'
           this.loginService.loginStatusSubjec.next(true);
          }else if(this.loginService.getUserRoles()== "VETERINARIO"){
          
            window.location.href='cliente';
            window.location.href='categoria';
            window.location.href='paciente';
            window.location.href='producto';
            window.location.href='perfil';
            
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
           
          }
        })
      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Detalles invalidos!',
          text: 'Puede registrarse'
        })
      }
    )

  }

}
