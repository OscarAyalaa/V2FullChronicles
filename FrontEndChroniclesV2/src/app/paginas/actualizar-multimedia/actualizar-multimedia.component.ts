import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Multimedia } from 'src/app/modelos/multimedia';
import { LoginService } from 'src/app/services/auth/login.service';
import { MultimediaService } from 'src/app/services/multimedia/multimedia.service';

@Component({
  selector: 'app-actualizar-multimedia',
  templateUrl: './actualizar-multimedia.component.html',
  styleUrls: ['./actualizar-multimedia.component.css']
})
export class ActualizarMultimediaComponent implements OnInit {

  registroError: string = "";

  id: number;
  multimedia: Multimedia;

  nombreFile = '';
  

  registerForm = this.formBuilder.group({
    titulo:['', Validators.required],
    genero:['', Validators.required],
    anio:['', Validators.required],
    direccion:['', Validators.required],
    tipo:['', Validators.required],
    portada:['', Validators.required],
    sinopsis:['', Validators.required],
    temporadas:['', Validators.required],
    episodios:['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private multiService: MultimediaService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.multiService.obtenerMultimediaID(this.id).subscribe(
      datos => {
        this.multimedia = datos;
        this.registerForm.controls.titulo.setValue(datos.titulo.toString());
        this.registerForm.controls.genero.setValue(datos.genero.toString());
        this.registerForm.controls.anio.setValue(datos.anio.toString());
        this.registerForm.controls.direccion.setValue(datos.direccion.toString());
        this.registerForm.controls.tipo.setValue(datos.tipo.toString());
        this.registerForm.controls.portada.setValue(datos.portada.toString());
        this.registerForm.controls.sinopsis.setValue(datos.sinopsis.toString());
        this.registerForm.controls.temporadas.setValue(datos.temporadas.toString());
        this.registerForm.controls.episodios.setValue(datos.episodios.toString());
      }
    )
    
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.nombreFile = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // Remove the prefix
      this.registerForm.controls.portada.setValue(base64String.trim()); // Set the clean Base64 string
    };
    reader.readAsDataURL(file);
  }

  actualizarMultimedia(){
    this.multiService.actualizarMultimedia(this.multimedia.id, this.registerForm.value as unknown as Multimedia).subscribe(
      datos => {
        this.router.navigate(['lista-multimedias']);
      }
    )
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

  get temporadas(){
    return this.registerForm.controls.temporadas;
  }

  get episodios(){
    return this.registerForm.controls.episodios;
  }

}
