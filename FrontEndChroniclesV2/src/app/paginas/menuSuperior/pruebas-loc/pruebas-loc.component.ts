import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Multimedia } from 'src/app/modelos/multimedia';
import { PruebasLocasService } from 'src/app/services/pruebasL/pruebas-locas.service';

@Component({
  selector: 'app-pruebas-loc',
  templateUrl: './pruebas-loc.component.html',
  styleUrls: ['./pruebas-loc.component.css']
})
export class PruebasLocComponent implements OnInit {

  multimedias: Multimedia[];
  registroError: string = "";

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

  constructor(private formBuilder: FormBuilder, private pruebaService: PruebasLocasService) { }

  ngOnInit(): void {
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // Remove the prefix
      this.registerForm.controls.portada.setValue(base64String.trim()); // Set the clean Base64 string
    };
    reader.readAsDataURL(file);
  }
  
  guardarMultimedia(){
    
    this.registerForm.controls.usuario.setValue("Nostrar");
    console.log("Base64 String for portada:", this.registerForm.value.portada);
    console.log("Form data being sent:", this.registerForm.value);

      this.pruebaService.guardarMultimedias(this.registerForm.value as unknown as Multimedia).subscribe({
        next: (userData) => {
          console.log("Response from backend:", userData);
          alert("Upload successful!");
        },
        error: (errorData) => {
          console.error("Error from backend:", errorData);
          this.registroError = errorData.error || "Failed to upload multimedia.";
        },
        complete: () => {
          console.info("Upload complete");
          this.registerForm.reset();
        }
      });
  }


}
