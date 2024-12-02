import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Multimedia } from 'src/app/modelos/multimedia';
import { LoginService } from 'src/app/services/auth/login.service';
import { MultimediaService } from 'src/app/services/multimedia/multimedia.service';

@Component({
  selector: 'app-registrar-multimedia',
  templateUrl: './registrar-multimedia.component.html',
  styleUrls: ['./registrar-multimedia.component.css']
})
export class RegistrarMultimediaComponent implements OnInit {

  registroError: string = "";
  userOn: String;

  registerForm = this.formBuilder.group({
    titulo:['', Validators.required],
    genero:['', Validators.required],
    anio:['', Validators.required],
    direccion:['', Validators.required],
    tipo:['', Validators.required],
    portada:['', Validators.required],
    sinopsis:['', Validators.required],
    usuario:['']
  })


  constructor(private formBuilder: FormBuilder, private router: Router, private multiService: MultimediaService, private loginService: LoginService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }

    this.loginService.userOn.subscribe({
      next:(userOn) => {
        const n = userOn.match(/^([^@]+)/);
        this.userOn = n[1];
      }
    })
  }

  get titulo(){
    return this.registerForm.controls.titulo;
  }

  get genero(){
    return this.registerForm.controls.genero;
  }

  get anio(){
    return this.registerForm.controls.anio;
  }

  get direccion(){
    return this.registerForm.controls.direccion;
  }

  get tipo(){
    return this.registerForm.controls.tipo;
  }

  get portada(){
    return this.registerForm.controls.portada;
  }

  get sinopsis(){
    return this.registerForm.controls.sinopsis;
  }

  guardarMultimedia(){
    this.registerForm.controls.usuario.setValue(this.userOn.toString());
    if(this.registerForm.valid){
      this.multiService.guardarMultimedia(this.registerForm.value as unknown as Multimedia).subscribe({
        next: (userData) =>{
          console.log(userData);
        },
        error: (errorData) =>{
          console.error(errorData);
          alert("Error: Existe un registro de este título con el mismo autor en el mismo año.");
          this.registroError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/lista-multimedias');
          this.registerForm.reset();
        }
      })

    }else{
      this.registerForm.markAllAsTouched();
      alert("Error al ingresar los datos")
    }
  }


}
