import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token : String = this.loginService.userToken;    //2

    if(token!=""){            	//3
      req = req.clone({		//3
        setHeaders: {							//4
          'Content-Type': 'application/json; charset=utf-8',		//4
          'Accept' : 'application/json',				//4
          'Authorization' : `Bearer ${token}`,				//4
        },
      });
    }

    return next.handle(req);						//5
  }
}
