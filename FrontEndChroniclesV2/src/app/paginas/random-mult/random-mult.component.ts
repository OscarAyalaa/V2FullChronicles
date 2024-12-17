import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Multimedia } from 'src/app/modelos/multimedia';
import { MultimediaService } from 'src/app/services/multimedia/multimedia.service';

@Component({
  selector: 'app-random-mult',
  templateUrl: './random-mult.component.html',
  styleUrls: ['./random-mult.component.css']
})
export class RandomMultComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private multiService: MultimediaService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }

    this.multiService.randomMultimedia().subscribe(
      datos => {
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

}
