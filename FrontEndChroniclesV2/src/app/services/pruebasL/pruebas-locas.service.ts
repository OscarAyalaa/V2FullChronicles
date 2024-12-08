import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Multimedia } from 'src/app/modelos/multimedia';

@Injectable({
  providedIn: 'root'
})
export class PruebasLocasService {

  constructor(private http: HttpClient) { }
  
  guardarMultimedias(data: Multimedia): Observable<any>{
    return this.http.post("http://localhost:8081/prueba", data);
  }
}
