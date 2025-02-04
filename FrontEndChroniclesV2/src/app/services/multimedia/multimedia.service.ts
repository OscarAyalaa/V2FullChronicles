import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/modelos/api-response';
import { Multimedia } from 'src/app/modelos/multimedia';
import { Page } from 'src/app/modelos/page';
import { environment } from 'src/environments/environment';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  userOn: string;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.loginService.userOn.subscribe({
      next:(userOn) => {
        const n = userOn.match(/^([^@]+)/);
        this.userOn = n[1];
      }
    })
   }

  // Make call to the back and API to retrive page of multimedias
  media$ = (titulo: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> =>
    this.http.get<any>(environment.urlHost+`multimedias?titulo=${titulo}&usuario=${this.userOn}&page=${page}&size=${size}`)

  // getPelicula(name: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Pelicula>> {
  //   return this.http.get<ApiResponse<Pelicula>>(`${this.serverUrl}/peliculas?$name=${name}&page=${page}&size=${size}`)
  // }

  guardarMultimedia(multimedia: Multimedia): Observable<any>{
    return this.http.post(environment.urlHost+`multimedias`, multimedia);
  }

  obtenerMultimediaID(id: number): Observable<Multimedia>{
    return this.http.get<Multimedia>(environment.urlHost+`multimedias/`+id);
  }

  actualizarMultimedia(id: number, multimedia: Multimedia): Observable<Object>{
    return this.http.put(environment.urlHost+`multimedias/`+id, multimedia);
  }

  eliminarMultimedia(id: number): Observable<Object>{
    return this.http.delete(environment.urlHost+`multimedias/`+id);
  }

  randoM$ = (): Observable<Multimedia> =>  // posible metod para quitar.
    this.http.get<Multimedia>(environment.urlHost+`multimedias/random`);

  randomMultimedia(): Observable<Multimedia>{
    return this.http.get<Multimedia>(environment.urlHost+`multimedias/random`);
  }
}
