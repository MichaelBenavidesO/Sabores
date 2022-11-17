import { Component, OnInit } from '@angular/core';
import { ModalTemplateService } from 'src/app/services/modal-template.service';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss']
})
export class ModalTemplateComponent implements OnInit {

  constructor(public modalservice: ModalTemplateService) { }
titulo="";
accion="";
element="";
  ngOnInit(): void {
    this.titulo=this.modalservice.titulo,
    this.accion=this.modalservice.accion.value,
    this.element=this.modalservice.element
  }

}
