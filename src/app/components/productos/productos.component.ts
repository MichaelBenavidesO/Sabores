import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';

import { ApiService } from 'src/app/services/api.service';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import Swal from 'sweetalert2';
import { ModalTemplateComponent } from '../modal-template/modal-template.component';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit{
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
    await this.api.getEstado("Productoes","true").then((res)=>{
      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]])
      }
      this.dataSource.data=res;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  loadTable(data:any[]){
    this.displayedColumns=[];
    for(let column in data[0]){
      this.displayedColumns.push(column)
    }
    this.displayedColumns.push("Acciones")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogEdit(element:any){
    this.modalservice.titulo="producto",
    this.modalservice.accion.next("Editar"),
    this.modalservice.element=element,

    this.dialog.open(ModalTemplateComponent,{
      width:'500px',
      height:'auto'

    });
  }

  eliminar(element){
    
    Swal.fire({
      title: '¿Estás seguro de eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
   }).then((result) => {   
      if (result.isConfirmed) {     
        this.api.delete("Productoes",element.idProducto);
        window.location.reload()
      }
    })
  }
  agregarProducto(){
    this.modalservice.titulo="producto",
    this.modalservice.accion.next("Agregar"),
    this.dialog.open(ModalTemplateComponent,{
      width:'500px',
      height:'auto'

    });

  }
}
