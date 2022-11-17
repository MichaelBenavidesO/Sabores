import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { UsuarioLogin } from '../modelsView/UsuarioLoginMV.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:HttpClient) {
  }
  url = "https://localhost:7078/api/";
  public async getAll(controller:string) {
    var DataResponse:any;
    await this.http.get(this.url+controller).toPromise().then((res)=>{
      DataResponse = res;
    })
    return DataResponse;
  }

  public async getByID(controller:string,Id:string) {
    var DataResponse:any;
    await this.http.get(this.url+controller+"/"+Id).toPromise().then((res)=>{
      DataResponse = res;
    })
    return DataResponse;
  }

   public async login(controller:string,email:string,password:string) {
    var DataResponse:UsuarioLogin;
    await this.http.get(this.url+controller+"/"+email+"/"+password).toPromise().then((res:UsuarioLogin)=>{

      DataResponse=res;
    })
    return DataResponse;
  }

  update(controller:string,body:object,id:number) {
    return this.http.put(this.url+controller+"/"+id,body).subscribe((res)=>
    console.log(res))
  }

  delete(controller:string,id:number) {
    return this.http.delete(this.url+controller+"/"+id).subscribe((res)=>
    console.log(res))
  }

  post(controller:string,obj:object) {
    return this.http.post(this.url+controller,obj).subscribe((res)=>
    console.log(res))
  }

  public async getEstado(controller:string, estado:string) {
    var DataResponse:any;
    await this.http.get(this.url+controller+'/estado/'+estado).toPromise().then((res)=>{
      DataResponse = res;
    })
    return DataResponse;
  }

}
