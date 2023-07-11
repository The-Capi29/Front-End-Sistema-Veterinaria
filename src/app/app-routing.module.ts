import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/Registro/registro.component';
import { RegistroClienteComponent } from './paginas/registro-cliente/registro-cliente.component';
import { CategoriaComponent } from './paginas/categoria/categoria.component';
import { CitasComponent } from './paginas/citas/citas.component';
import { VeterinarioComponent } from './paginas/veterinario/veterinario.component';
import { PacienteComponent } from './paginas/paciente/paciente.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { BoletaComponent } from './paginas/boleta/boleta.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { NormalGuard as guard } from './Guard/normal-guard';
import { Admin as admi } from './Guard/admin';

import { RegistroLoginComponent } from './paginas/login/registro-login/registro-login.component';
import { Roles } from './Guard/Roles';
import { PerfilUsuarioComponent } from './paginas/perfil-usuario/perfil-usuario.component';
import { PrincipaComponent } from './paginas/principa/principa.component';
import { RegistroPacienteComponent } from './paginas/paciente/registro-paciente/registro-paciente.component';
import { RegistroDetalleComponent } from './paginas/registro-detalle/registro-detalle.component';
import { PerfilPacienteComponent } from './paginas/paciente/perfil-paciente/perfil-paciente.component';






const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch:'full'},
  { path: 'login', component: LoginComponent, pathMatch:'full'},
  { path: 'principal', component: PrincipaComponent, pathMatch:'full'},
  { path: 'producto', component: RegistroComponent, pathMatch:'full', canActivate: [Roles]},
  { path: 'detalle-producto/:id', component: RegistroDetalleComponent, pathMatch:'full', canActivate: [Roles]},
  { path: 'cliente', component: RegistroClienteComponent, canActivate: [Roles]},
  {path: 'categoria', component: CategoriaComponent, pathMatch:'full', canActivate: [Roles]},
  {path:'cita', component: CitasComponent, pathMatch:'full', canActivate: [Roles]},
  {path:'veterinario', component: VeterinarioComponent, pathMatch:'full', canActivate: [Roles]},
  {path:'paciente', component: PacienteComponent, pathMatch:'full', canActivate: [Roles]},
  {path:'servicio', component: ServiciosComponent, pathMatch:'full', canActivate: [Roles]},
  {path:'index', component: InicioComponent , pathMatch:'full', canActivate: [Roles]},
  {path:'boleta', component: BoletaComponent , pathMatch:'full', canActivate: [Roles]},
  {path:'usuario', component: UsuariosComponent , pathMatch:'full', canActivate: [Roles]},
  {path:'perfil', component: PerfilUsuarioComponent , pathMatch:'full', canActivate: [Roles]},
  {path:'registro-paciente', component: RegistroPacienteComponent , pathMatch:'full', canActivate: [Roles]},
  { path: 'perfil-paciente/:id', component: PerfilPacienteComponent, pathMatch:'full', canActivate: [Roles]},
  {path:'registro', component: RegistroLoginComponent , pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
