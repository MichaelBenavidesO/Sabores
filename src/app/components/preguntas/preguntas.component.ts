import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from 'src/app/services/api.service';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import Swal from 'sweetalert2';
import { ModalTemplateComponent } from '../modal-template/modal-template.component';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit{
  dataSource: MatTableDataSource<any>;
  constructor(public api:ApiService,public modalservice: ModalTemplateService,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>;
  }

  public displayedColumns: string[]=[]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title="";

  ngOnInit():void{
    this.get();

  this.modalservice.accion.subscribe((res)=>{
    this.title=res;
    console.log(this.modalservice.element);
  if(res=='Editar'){}

  })


  }

  public async get(){
    await this.api.getAll("Preguntums").then((res)=>{
      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]])
      }
      this.dataSource.data=res;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadTable(data:any[]){
    this.displayedColumns=[];
    for(let column in data[0]){
      this.displayedColumns.push(column)
    }
    this.displayedColumns.push("Acciones")
  }



  openDialogEdit(element:any){
    this.modalservice.titulo="pregunta",
    this.modalservice.accion.next("Editar"),
    this.modalservice.element=element,

    this.dialog.open(ModalTemplateComponent,{
       width:'400px',
      height:'500px'

    });
  }

  eliminar(element){
    
    Swal.fire({
      title: '¿Estás seguro de eliminar la pregunta?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
   }).then((result) => {   
      if (result.isConfirmed) {     
        this.api.delete("Preguntums",element.idPregunta);
        window.location.reload()
      }
    })
  }
  realizarPregunta(){
    this.modalservice.titulo="pregunta",
    this.modalservice.accion.next("Agregar"),
    this.dialog.open(ModalTemplateComponent,{
      width:'400px',
      height:'350px'

    });

  }
}
