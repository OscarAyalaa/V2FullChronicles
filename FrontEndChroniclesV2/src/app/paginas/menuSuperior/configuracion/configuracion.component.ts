import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/modelos/user';
import { UserCustom } from 'src/app/modelos/user-custom';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  errorMessage: String = "";
  usuario: String;
  userOn: String;
  id: number;
  datosUsuario: UserCustom;
  datosUser: User;

  registerForm=this.formBuilder.group({
    id:[''],
    lastname:['',Validators.required],
    firstname:['',Validators.required],
    country:['',Validators.required]
  })

  settingsForm=this.formBuilder.group({
    id:[''],
    password:['', Validators.required]
  })

  constructor(private loginService: LoginService, private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }

    this.loginService.userOn.subscribe({
      next: (userOn) => {
        this.usuario = userOn;
        const n = userOn.match(/^([^@]+)/);
        this.userOn = n[1];
      }
    })

    this.userService.getUserr(this.usuario).subscribe({
      next: (userData) => {
        this.datosUsuario = userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.firstname.setValue( userData.firstname);
        this.registerForm.controls.lastname.setValue( userData.lastname);
        this.registerForm.controls.country.setValue( userData.country);
        this.settingsForm.controls.id.setValue(userData.id.toString());
        this.settingsForm.controls.password.setValue( userData.password);
      },
      error: (errorData) => {
        this.errorMessage = errorData
      },
      complete: () => {
        console.info("User Data ok");
      }
    })
  }

  get firstname() {
    return this.registerForm.controls.firstname;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get country() {
    return this.registerForm.controls.country;
  }

  get password(){
    return this.settingsForm.controls.password;
  }


  saveDatosPersonales() {
    if(this.registerForm.valid){
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          alert("Cambios realizados");
          this.ngOnInit();
        },
        error:(errorData) => console.error(errorData)
      })
    }
  }

  changePassword(){
    if(this.registerForm.valid){
      this.userService.updateSettings(this.settingsForm.value as unknown as UserCustom).subscribe({
        next:() => {
          alert("Cambios realizados");
          this.ngOnInit();
        },
        error:(errorData) => console.error(errorData)
      })
    }
  }

}
