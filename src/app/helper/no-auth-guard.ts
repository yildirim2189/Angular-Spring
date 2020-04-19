import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from "../services/token-storage.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class NoAuthGuard implements CanActivate{

    constructor(private router: Router, private tokenStorageService: TokenStorageService){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // Not authenticated.
        if(this.tokenStorageService.getUser() == null && this.tokenStorageService.getToken() == null){
            this.router.navigateByUrl("/login");
            return false;
        }
        // Authenticated.
        return true;
    }
}