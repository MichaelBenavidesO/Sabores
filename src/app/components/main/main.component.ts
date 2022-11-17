import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { ModalTemplateComponent } from '../modal-template/modal-template.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    public router:Router,
    public dialog:MatDialog,
    public modalservice:ModalTemplateService,
  ) { 
    
  }

  ngOnInit(): void {
  }
login(){
this.modalservice.titulo="",
    this.modalservice.accion.next("Iniciar sesion"),
    this.dialog.open(ModalTemplateComponent,{
      width:'400px',
      height:'350px'
    
    });
}
}
