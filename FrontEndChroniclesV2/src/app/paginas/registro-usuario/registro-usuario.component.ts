import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/modelos/register-request';
import { RegisterService } from 'src/app/services/auth/register.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  registerError: String= "";

  constructor(private formBuilder: FormBuilder, private router: Router, private regisService: RegisterService) { }

  registerForm = this.formBuilder.group({
    username:['',[Validators.required, Validators.email]],
    password:['', Validators.required],
    firstname:['', Validators.required],
    lastname:['', Validators.required],
    country:['', Validators.required],
  })

  ngOnInit(): void {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }
  }

  get email(){
    return this.registerForm.controls.username;
  }

  get password(){
    return this.registerForm.controls.password;
  }

  get firstname(){
    return this.registerForm.controls.firstname;
  }

  get lastname(){
    return this.registerForm.controls.lastname;
  }

  get country(){
    return this.country.controls.country;
  }

  registro(){
    if(this.registerForm.valid){
      this.regisService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: (userData) =>{
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.registerError = errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/iniciar-sesion');
          this.registerForm.reset();
        }
      })

    }else{
      this.registerForm.markAllAsTouched();
      alert("Error al ingresar los datos")
    }
  }

}
