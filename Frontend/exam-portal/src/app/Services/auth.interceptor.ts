import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./Login/login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService: LoginService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // throw new Error("Method not implemented.");

        // add JTW Token in request

        const token = this.loginService.getTokenFromLocal()
        let authReq = req
        if(token != null){
            authReq = authReq.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            });
        }
        return next.handle(authReq)
    }
}

export const AuthInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true 
    }
]