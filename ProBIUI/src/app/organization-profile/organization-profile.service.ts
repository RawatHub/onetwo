import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ConfigService } from '../shared/config.service'
import { AuthService } from '../shared/auth.service'
import { IOrganization } from '../models/organization.interface';
import { IApiResponse } from '../models/apiResponse.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class OrganizationService {
    constructor(private _http: Http, private _config: ConfigService, private _authService: AuthService) { }

    add(organization : IOrganization): Observable<IApiResponse>{
        return  this._http.post(this._config.getUrl("organization/add"), organization)
        .map((response: Response) => <IApiResponse>response.json())
        .do(
        function (data) {
            if (!data.result) {
                console.log(data.error);
            }
        })
        .catch(this.handleError);
        
    }
    private handleError(error: Response) {
        console.log(error);
        return Observable.throw('Sorry, me and api are not talking');
    }
}