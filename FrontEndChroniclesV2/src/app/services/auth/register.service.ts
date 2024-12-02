import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from 'src/app/modelos/register-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(credentials: RegisterRequest): Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/register", credentials);
  }
  
}
