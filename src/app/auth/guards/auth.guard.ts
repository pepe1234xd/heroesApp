import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authService:AuthService, private router:Router){}

     canActivate(
       route: ActivatedRouteSnapshot,
       state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //     if(this.authService.auth.id){
    //       return true;
    //    }
    // console.log('bloqueado papu - Can Activate');
    // return false;
    return this.authService.verificarAuth().pipe(
      tap(resp=>{
        if(!resp){
          this.router.navigate(['./auth/login'])
        }
      })
    );



    }

   
    
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificarAuth().pipe(
        tap(resp=>{
          if(!resp){
            this.router.navigate(['./auth/login'])
          }
        })
      );;

  }
}
