import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agrega-producto',
  templateUrl: './agrega-producto.component.html',
  styleUrls: ['./agrega-producto.component.scss']
})
export class AgregaProductoComponent {
  addressForm = this.fb.group({
    nombre: [null, Validators.required],
    descripcion: [null, Validators.required],
    precio: [null, Validators.required],
    file: [null],
  });
  srcResult: any;
  title="";
  

  constructor(private fb: FormBuilder,public service:ApiService, public modalservice:ModalTemplateService) {}


  ngOnInit(): void{
    console.log(this.modalservice.element);
    this.modalservice.accion.subscribe((res)=>{
      this.title=res;
      if(res=='Editar'){
        this.addressForm.controls['nombre'].setValue(this.modalservice.element.nombreProducto);
        this.addressForm.controls['descripcion'].setValue(this.modalservice.element.descripcion);
        this.addressForm.controls['precio'].setValue(this.modalservice.element.precio);
      }
    })

  }


  onSubmit(): void {
    if(this.modalservice.accion.value=="Agregar"){
      if(this.addressForm.valid){
        const producto={
          nombreProducto: this.addressForm.get('nombre')?.value,
          descripcion: this.addressForm.get('descripcion')?.value,
         imagen: "img",
         precio: this.addressForm.get('precio')?.value,
         estado: true,
        }
        this.service.post("Productoes",producto)
       Swal.fire(
        'Hecho!',
        'Producto registrado',
        'success'
       )
      }
    }

     if(this.modalservice.accion.value=="Editar"){
      if(this.addressForm.valid){
        const producto:Product={
          idProducto:this.modalservice.element.idProducto,
          nombreProducto: this.addressForm.get('nombre')?.value,
          descripcion: this.addressForm.get('descripcion')?.value,
         imagen: "img",
         precio: this.addressForm.get('precio')?.value,
         estado: true,
        }
        console.log(this.service.update("Productoes",producto,this.modalservice.element.idProducto));
        this.service.update("Productoes",producto,this.modalservice.element.idProducto)
       Swal.fire(
        'Hecho!',
        'Producto Actualizado',
        'success'
       )
      }

    }
    window.location.reload()
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
