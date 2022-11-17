import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent {
  addressForm = this.fb.group({
    nombres: [null, Validators.required],
    apellidos: [null, Validators.required],
    identificacion: [null, Validators.required],
    password: [null, Validators.required],
    passwordr: [null, Validators.required],
    email: [null, Validators.required],
  });

  constructor(private fb: FormBuilder,public service:ApiService) {}



  onSubmit(): void {

     const usuario:Usuarios={
       nombre: this.addressForm.get('nombres')?.value,
       apellido: this.addressForm.get('apellidos')?.value,
       documentoIdentidad: this.addressForm.get('identificacion')?.value,
       correoElectronico: this.addressForm.get('email')?.value,
       contrasena: this.addressForm.get('password')?.value,
       olvidarContrasena: "123",
       imagen: "img",
       rol: "USUARIO",
     }
     this.service.post("Usuarios",usuario)
    Swal.fire(
      'Bienvenido!',
      'Registro exitoso',
      'success'
    )

  }
}
