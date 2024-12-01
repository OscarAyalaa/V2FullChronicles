import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Multimedia } from 'src/app/modelos/multimedia';
import { MultimediaService } from 'src/app/services/multimedia/multimedia.service';

@Component({
  selector: 'app-detalles-multimedia',
  templateUrl: './detalles-multimedia.component.html',
  styleUrls: ['./detalles-multimedia.component.css']
})
export class DetallesMultimediaComponent implements OnInit {

  id: number;
  multimedia: Multimedia;
  ActError: String = "";

  registerForm = this.formBuilder.group({
    titulo:['', Validators.required],
    genero:['', Validators.required],
    anio:['', Validators.required],
    direccion:['', Validators.required],
    tipo:['', Validators.required],
    portada:['', Validators.required],
    sinopsis:['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private multiService: MultimediaService) { }

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

}
