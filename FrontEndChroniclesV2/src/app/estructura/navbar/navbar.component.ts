import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  opened = false;
  userLoginOn: boolean = false;
  userOn: String;
  email: String;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })

    this.loginService.userOn.subscribe({
      next:(userOn) => {
        this.email = userOn;
        const n = userOn.match(/^([^@]+)/);
        this.userOn = n[1];
      }
    })
  }
  
  logout(){
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }

}
