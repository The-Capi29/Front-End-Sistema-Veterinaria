import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Chart, ChartData, ChartType } from 'chart.js';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  totalProductos: number;
  totalUsuario: number;
  totalPaciente: number;

  pieChartData!: ChartData<ChartType, number[], string>;
  pieChartLabels: string[] = [];

  constructor(private productoService: ProductoService, private usuarioTotal: UsuarioService, private pacienteTotal: PacienteService) { }
  ngOnInit(): void {
    /*this.productoService.listaProducto().subscribe(products => {
      this.productCount = products.length;
    });*/

    this.productoService.getTotalProductoschart().subscribe(
      data => {
        this.pieChartLabels = Object.keys(data);
        this.pieChartData = {
          labels: this.pieChartLabels,
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'grey'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'grey'],
            },
          ],
        }
      }
    );





    this.productoService.getTotalProductos().subscribe(
      total => this.totalProductos = total,
      error => console.error(error)
    );
    this.usuarioTotal.getTotalUsuario().subscribe(
      total => this.totalUsuario = total,
      error => console.error(error)
    );
    this.pacienteTotal.getTotalPaciente().subscribe(
      total => this.totalPaciente = total,
      error => console.error(error)
    );
  }

}