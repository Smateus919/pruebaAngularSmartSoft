import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private validAuth

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.isValidAuth$.subscribe(data =>{
      console.log(this.validAuth);
      this.validAuth = data
      if (this.validAuth == false) {
        this.router.navigate(['/'])
        return this.validAuth
      }
    })
    return this.validAuth;
  }

}
