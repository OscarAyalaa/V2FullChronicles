import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/modelos/login-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUser: BehaviorSubject<String> = new BehaviorSubject<String>(""); //a

  constructor(private http: HttpClient) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    this.currentUser= new BehaviorSubject<String>(sessionStorage.getItem("us") || "");  //a
  }

  login(credentials: LoginRequest): Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/login", credentials).pipe(
      tap ( (userData) => {
        sessionStorage.setItem("token", userData.token);
        sessionStorage.setItem("us", credentials.username); //a
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        this.currentUser.next(credentials.username);  //a
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){							//1
      console.error('se ha producido un error', error.error);
    }else{
      console.error('Backend retornó el código de estado' , error);
    }
    return throwError(() => new Error('Algo falló. Intente Nuevamente.')) 
  }

  logout():void{
    sessionStorage.removeItem("token");  //6
    sessionStorage.removeItem("us");    //a
    this.currentUserLoginOn.next(false);
  }

  get userData(): Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userOn(): Observable<String>{   //a
    return this.currentUser.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }

}
