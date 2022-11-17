import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioLogin } from 'src/app/modelsView/UsuarioLoginMV.model';
import { ApiService } from 'src/app/services/api.service';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-realiza-pregunta',
  templateUrl: './realiza-pregunta.component.html',
  styleUrls: ['./realiza-pregunta.component.scss']
})
export class RealizaPreguntaComponent {
  
  title="";
  accion="";
  user:UsuarioLogin;
  addressForm = this.fb.group({
    identificacion: null,
    pregunta: [null, Validators.required],
    respuesta:[null],


  });

  constructor (private fb: FormBuilder,public service:ApiService, public modalservice:ModalTemplateService) {
    this.user= JSON.parse(localStorage.getItem("Usuario"))

  }

  ngOnInit(): void{
    console.log(this.modalservice.element);
    this.modalservice.accion.subscribe((res)=>{
      this.title=res;
      this.accion=this.modalservice.accion.value;
      if(res=='Editar'){
        this.addressForm.controls['identificacion'].setValue(this.modalservice.element.idPregunta);
        this.addressForm.controls['pregunta'].setValue(this.modalservice.element.pregunta);
        this.addressForm.controls['respuesta'].setValue(this.modalservice.element.respuesta);
      }
    })

  }
   onSubmit(): void {
    if(this.modalservice.accion.value=="Agregar"){
      if(this.addressForm.valid){
        const pregunta={
          idUsuario: this.user.idUsuario,
          pregunta:this.addressForm.controls.pregunta.value,
          respuesta:this.addressForm.controls.respuesta.value,
        }
        this.service.post("Preguntums",pregunta)
       Swal.fire(
        'Hecho!',
        'Pregunta realizada',
        'success'
       )
      }
    }
      if(this.modalservice.accion.value=="Editar"){
      if(this.addressForm.valid){
        const pregunta={
          idPregunta: this.modalservice.element.idPregunta,
          idUsuario: this.user.idUsuario,
          pregunta:this.addressForm.controls.pregunta.value,
          respuesta:this.addressForm.controls.respuesta.value,
        }
        this.service.update("Preguntums",pregunta,this.modalservice.element.idPregunta)
       Swal.fire(
        'Hecho!',
        'Pregunta actualizada',
        'success'
       )
      }
    }
    window.location.reload()
  }
}
