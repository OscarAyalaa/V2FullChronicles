import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  avatarPic: string;
  opened = false;
  userLoginOn: boolean = false;
  userOn: String;
  email: String;
  constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

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

    const cachedAvatar = localStorage.getItem('avatarPic');
    if(cachedAvatar){
      this.avatarPic = cachedAvatar;
    }else{
      this.fetchAvatar();
    }
    
  }

  fetchAvatar(){
    this.userService.getAssets(this.email).subscribe({
      next: datos =>{
        if(datos && datos.avatar){
          this.avatarPic = 'data:image/png;base64,' + datos.avatar;
          localStorage.setItem('avatarPic', this.avatarPic);
        }
      },
      error: (err) => {
        console.error('Error fetching avatar: ', err);
      },
    });
  }
  
  logout(){
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }

}
