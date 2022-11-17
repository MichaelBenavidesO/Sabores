import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioLogin } from 'src/app/modelsView/UsuarioLoginMV.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifica-usuario',
  templateUrl: './modifica-usuario.component.html',
  styleUrls: ['./modifica-usuario.component.scss']
})
export class ModificaUsuarioComponent {
  public files: any =[]
  loading: boolean;

  ruta="../../../assets/imgs/img_avatar.png"
  addressForm = this.fb.group({

    nombres: "",
    apellidos: '',
    identificacion:0,
    email: '',
    password:'',
    passwordr:''
  });
  srcResult: any;
  user:UsuarioLogin;
  constructor(
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    public api: ApiService,
    ) {
    this.user= JSON.parse(localStorage.getItem("Usuario"))
   
  }

  ngOnInit(): void{
     this.addressForm.controls['nombres'].setValue(this.user.nombre);
     this.addressForm.controls['apellidos'].setValue(this.user.apellido);
     this.addressForm.controls['identificacion'].setValue(this.user.documentoIdentidad);
     this.addressForm.controls['email'].setValue(this.user.correoElectronico);
     this.addressForm.controls['password'].setValue(this.user.contrasena);
     this.addressForm.controls['passwordr'].setValue(this.user.contrasena);
     

  }
  onSubmit(): void {
      if(this.addressForm.valid){
        if(this.addressForm.controls.password.value==this.addressForm.controls.passwordr.value){
        const usuario:UsuarioLogin={
          idUsuario:this.user.idUsuario,
          nombre:this.addressForm.controls.nombres.value,
          apellido:this.addressForm.controls.apellidos.value,
          documentoIdentidad:this.addressForm.controls.identificacion.value,
          correoElectronico:this.addressForm.controls.email.value,
          contrasena:this.addressForm.controls.password.value,
          olvidarContrasena:"12345",
          rol:"ADMIN",
          imagen:"img",
        }
         
        Swal.fire({
      title: '¿Estás seguro de actualizar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
   }).then((result) => {   
      if (result.isConfirmed) {     
        this.api.update("Usuarios",usuario,this.user.idUsuario)
        localStorage.removeItem("Usuario")
         localStorage.setItem("Usuario", JSON.stringify(usuario));
        window.location.reload()
      }
    })
        }else{
        Swal.fire(
        'Error!',
        'Las contraseñas no coinciden',
        'error'
       )

        }
        
        }
  }

  onFileSelected(event: any) {
    const imagen = event.target.files[0];
    console.log(imagen);
    this.files.push(imagen)
    this.blobFile(imagen).then((res: any) => {
        this.ruta = res.base;
    })
    console.log(this.ruta);
  }

  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


}
