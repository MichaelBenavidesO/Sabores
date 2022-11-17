import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Login:string=''
  Session:string=''

  ngOnInit(): void {
    this.Session = sessionStorage.getItem('Session')
    console.log(this.loginservice.login);
    if(this.Session!=null){
    this.loginservice.login.next('login')
  }else{
    this.loginservice.login.next('logout')
    this.loginservice.user.next(null);
  }
    this.loginservice.login.subscribe((value=>{
    this.Login=value;
    console.log(this.Login);

   }))


}


  constructor(public loginservice:LoginService){

  }




}
