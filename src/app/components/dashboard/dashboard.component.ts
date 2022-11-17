import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one
   *zcolumn per row */


  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(() => {


      return [
        { title: 'Ventas',contenido: 'Consulta1', cols: 1, rows: 1 },
          { title: 'Reservas', contenido: 'Consulta2',cols: 1, rows: 1 },
          { title: 'Preguntas', contenido: 'Consulta3',cols: 1, rows: 1 },
          { title: 'Clientes', contenido: 'Consulta4',cols: 1, rows: 1 },
          { title: 'Card 5',contenido: 'Consulta5', cols: 4, rows: 2 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,public service:ApiService) {}

  ngOnInit() {


  }

}
