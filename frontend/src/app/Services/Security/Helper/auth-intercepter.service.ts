import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor {

  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    //existe token
    if (token != null) {
      authReq= req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      return next.handle(authReq);
    }
    //pas de token
    else if (token == null){
      // delete req.headers['Authorization'];
      req.headers.delete('Authorization');
      return next.handle(req);
    }
    //token expiré:situation inattendue où le token est ni nul ni non nul.
    else {
      authReq= req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      return next.handle(authReq);
    }
  }


}
export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi: true}
];
