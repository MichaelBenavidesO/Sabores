import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuarioLogin } from '../modelsView/UsuarioLoginMV.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  usuario:UsuarioLogin=null
  user= new BehaviorSubject<UsuarioLogin>(this.usuario);
  login = new BehaviorSubject('logout');
  constructor() { }
  ngOnInit(): void {
    this.login.next('logout')
    this.user.next(null)
  }

}
