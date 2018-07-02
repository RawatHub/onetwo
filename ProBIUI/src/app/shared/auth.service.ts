import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/config.service'
import { IUser } from '../models/user.interface'

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    token: string = "";
    currentUser: IUser = null;
    // store the URL so we can redirect after logging in
    redirectUrl: string;
    constructor(private _config: ConfigService) { }
    //login(): Observable<boolean> {
    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    //}
    
    isLoggedInUser():boolean{
        return window.localStorage.getItem(this._config.tokenKey) != null;
    };
    getToken():string{
        return window.localStorage.getItem(this._config.tokenKey);
    };
    user():IUser{
        return  JSON.parse(window.localStorage.getItem(this._config.userKey))  as IUser;
    };

    logout(): void {
        this.currentUser = null;
        window.localStorage.removeItem(this._config.tokenKey);
        this.isLoggedIn = false;
    }
}