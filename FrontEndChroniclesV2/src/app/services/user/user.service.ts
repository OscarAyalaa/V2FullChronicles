import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Rassets } from 'src/app/modelos/rassets';
import { User } from 'src/app/modelos/user';
import { UserCustom } from 'src/app/modelos/user-custom';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id:number): Observable<User>{
    return this.http.get<User>(environment.urlApi+"user/"+id).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(userRequest: User): Observable<any>{
    return this.http.put(environment.urlApi+"user", userRequest).pipe(
      catchError(this.handleError)
    )
  }

  getUserr(username:String): Observable<UserCustom>{
    return this.http.get<UserCustom>(environment.urlApi+"user/byUser/"+username).pipe(
      catchError(this.handleError)
    )
  }

  updateSettings(datos: UserCustom): Observable<any>{
    return this.http.put(environment.urlApi+"user/settings", datos).pipe(
      catchError(this.handleError)
    )
  }

  guardarAvatar(assets: Rassets): Observable<any>{
    return this.http.post(environment.urlApi+"user/settings/avatar", assets);
  }

  getAssets(username: String): Observable<Rassets>{
    return this.http.get<Rassets>(environment.urlApi+"user/settings/"+username).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('se ha producido un error', error.error);
    }else{
      console.error('Backend retornó el código de estado' , error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Intente Nuevamente.')) 
  }
}
