import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    constructor() { }
    private _apiBaseUrl: string = "http://localhost:3000/";
    getBaseUrl(): string {
        return this._apiBaseUrl;
    }
    getUrl(url: string): string {
        return this._apiBaseUrl + url;
    }
    tokenKey:string = 'whiskey';
    userKey:string ='rum';
}