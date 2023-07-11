import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  textoEditable: string;
  textoGuardado: string;
  constructor(public loginService: LoginService) { }
  ngOnInit() {
    this.textoEditable = 'Me gusta el Futbol';
    this.textoGuardado = this.textoEditable;
  }

  perfil() {
    this.loginService.logout();
    this.loginService.getUserRoles();
    window.location.reload();
  }
  guardarTexto() {
    // Actualizar el valor del texto guardado
    this.textoGuardado = this.textoEditable;
    console.log('Texto guardado:', this.textoGuardado);
  }
}
