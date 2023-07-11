import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroComponent } from './paginas/Registro/registro.component';
import { LoginComponent } from './paginas/login/login.component';
import {AppRoutingModule} from './app-routing.module'
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { NavHeaderComponent } from './paginas/nav-header/nav-header.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { NavSidebarComponent } from './paginas/nav-sidebar/nav-sidebar.component';
import {MatSelectModule} from '@angular/material/select';
import { RegistroClienteComponent } from './paginas/registro-cliente/registro-cliente.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoriaComponent } from './paginas/categoria/categoria.component';
import { CitasComponent } from './paginas/citas/citas.component';
import { VeterinarioComponent } from './paginas/veterinario/veterinario.component';
import { PacienteComponent } from './paginas/paciente/paciente.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { BoletaComponent } from './paginas/boleta/boleta.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { authInterceptorProviders } from './service/auth.interceptor';
import { RegistroLoginComponent } from './paginas/login/registro-login/registro-login.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PerfilUsuarioComponent } from './paginas/perfil-usuario/perfil-usuario.component';
import { MatNativeDateModule } from '@angular/material/core';
import { PrincipaComponent } from './paginas/principa/principa.component';
import { RegistroPacienteComponent } from './paginas/paciente/registro-paciente/registro-paciente.component';
import { NgChartsModule } from 'ng2-charts';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { RegistroDetalleComponent } from './paginas/registro-detalle/registro-detalle.component';
import { PerfilPacienteComponent } from './paginas/paciente/perfil-paciente/perfil-paciente.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    NavHeaderComponent,
    NavSidebarComponent,
    RegistroClienteComponent,
    CategoriaComponent,
    CitasComponent,
    VeterinarioComponent,
    PacienteComponent,
    ServiciosComponent,
    BoletaComponent,
    InicioComponent,
    UsuariosComponent,
    RegistroLoginComponent,
    PerfilUsuarioComponent,
    PrincipaComponent,
    RegistroPacienteComponent,
    RegistroDetalleComponent,
    PerfilPacienteComponent,




  

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatTabsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
