import { Component,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Reserva } from 'src/app/models/reserve.model';
import { UsuarioLogin } from 'src/app/modelsView/UsuarioLoginMV.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-realiza-reserva',
  templateUrl: './realiza-reserva.component.html',
  styleUrls: ['./realiza-reserva.component.scss']
})
export class RealizaReservaComponent implements OnInit {
  user:UsuarioLogin;
  identificacion: number;
  sedes = [];
  ngOnInit():void{
    this.get()
  }

  public async get(){
    await this.api.getAll("Sedes").then((res)=>{
      for (let index = 0; index < res.length; index++) {
        this.sedes.push([res[index]])
      }
    });
    console.log(this.sedes)
  }

  addressForm = this.fb.group({
    identificacion: [null, Validators.required],
    cantidad: [null, Validators.compose([
      Validators.required, Validators.min(1), Validators.max(8)])
    ],
    sede: [null, Validators.required],
    motivo: [null, Validators.required],
    hora: [null, Validators.compose([
      Validators.required, Validators.min(12), Validators.max(18)])
    ],
    fecha: [null, Validators.required],

  });

  motivos = [
    {name: null},
    {name: 'Cumpleaños'},
    {name: 'Aniversario'},
    {name: '15 años'},
    {name: 'Boda'}
  ];

  constructor(private fb: FormBuilder,public api:ApiService) {
    this.user= JSON.parse(localStorage.getItem("Usuario"))
    this.identificacion=this.user.documentoIdentidad;
  }

  onSubmit(): void {

    const reserva:Reserva={
      idUsuario: this.user.idUsuario,
      idSede: this.addressForm.get('sede')?.value,
      fechaReserva:this.addressForm.get('fecha')?.value,
      cantidadPersonas: this.addressForm.get('cantidad')?.value,
      evento: this.addressForm.get('motivo')?.value,
      hora: this.addressForm.get('hora')?.value,
      activo: true
    }
    console.log(reserva)
    this.api.post("Reservas",reserva)
  }
}
