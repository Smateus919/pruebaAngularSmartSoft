import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { User } from "../interfaces/user.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isValidAuth = new BehaviorSubject<boolean>(false)
  isValidAuth$ = this.isValidAuth.asObservable()

  private _authenticatedUser: User = {
    active: true,
    lastName: "Apellido",
    secondLastName: "Apellido 2",
    createDate: new Date(),
    id: 1,
    secondName: "Nombre 2",
    firstName: "Nombre"
  };

  constructor(private http: HttpClient) {
  }

  public getNames(names: {firstName?: boolean, secondName?: boolean, lastName?: boolean, secondLastName?: boolean}){
    // tslint:disable-next-line:prefer-const
    let output = [];
    if(names.firstName){
      output.push(AuthService.validateName(this._authenticatedUser.firstName));
    }
    if(names.secondName){
      output.push(AuthService.validateName(this._authenticatedUser.secondName));
    }
    if(names.lastName){
      output.push(AuthService.validateName(this._authenticatedUser.lastName));
    }
    if(names.secondLastName){
      output.push(AuthService.validateName(this._authenticatedUser.secondLastName));
    }
    return output.join(" ");
  }

  private static validateName(name: string){
    if(!name || name === "null" || name === "undefined"){
      return "";
    }
    return name;
  }

  public validateAuth(user: string, password: string){
    if (user === 'adminPruebas' && password === 'contratado2022') {
      this.isValidAuth.next(true)
    }else{
      this.isValidAuth.next(false)
    }
    return this.isValidAuth.value
  }
}
