import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent  implements OnInit{

constructor(public loginService:LoginService, private router:Router){}

  ngOnInit(): void {
   
  }

public cerrarSesion(){
  this.loginService.logout();
  window.location.reload();
  this.router.navigate(['/']);
}


}
