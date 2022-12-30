import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.intercace';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth:Auth | undefined;

  get auth():Auth{
    return {...this._auth!};
  }

  constructor(private http:HttpClient) { }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap(resp=> this._auth = resp),
      tap(auth=>localStorage.setItem('token', auth.id))
    );
  }

  verificarAuth():Observable<boolean> {
    if(!localStorage.getItem('token')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map(auth=>{
        this._auth=auth;
        return true;
      })
    )
  }

}
