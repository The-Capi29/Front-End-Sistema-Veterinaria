import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent implements OnInit {
  roles:string[];
  isAdmin = false;
  constructor(
   
    private router: Router, 
    public loginService:LoginService
    
    ) { }

  ngOnInit(){
   /* this.roles = this.loginService.getUserRoles();
    this.roles.forEach(rol => {
      if (rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });*/
  }

}
