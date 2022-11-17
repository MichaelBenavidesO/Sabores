import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalTemplateService {
 titulo="";
 accion=new BehaviorSubject("");
  element;
  constructor() { }


}
