import { HTTP_INTERCEPTORS, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { TokenStorageService } from "../services/token-storage.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(
        private tokenStorageService: TokenStorageService, 
        private router: Router,
        private snackBar: MatSnackBar ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest =  request;
        const token = this.tokenStorageService.getToken();
        if(token != null){
            let headers = new HttpHeaders({
                'Authorization': 'Bearer ' + token,
            });
            authRequest = request.clone({headers});
        }
        return next.handle(authRequest).pipe(
            catchError(
                (err, caught) => {
                    if(err.status === 401){
                        this.handleAuthError();
                        return of(err);
                    }
                    throw err;
                }
            )
        );
    }

    handleAuthError() {
        this.tokenStorageService.signOut();
        this.snackBar.open("Session is expired", null, {
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top"
        });
        setTimeout(() => {this.router.navigateByUrl("/login");}, 2000)
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true } 
];