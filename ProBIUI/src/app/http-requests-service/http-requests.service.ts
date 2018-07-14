import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpRequestsService {
  constructor(private _http: HttpClient, private _config: ConfigService) { }

  getAll(url_type: string): Observable<any> {
    return this._http.get(this._config.getUrl(url_type) + "/get");
  }

  getById(url_type: string, _id: string): Observable<any> {
    return this._http.get(this._config.getUrl(url_type) + "/get/" + _id);
  }

  delete(url_type: string, _id: string): Observable<any> {
    return this._http.delete(this._config.getUrl(url_type) + "/delete/" + _id);
  }

  update(url_type: string, _id: string, entity: any): Observable<any> {
    return this._http.put(this._config.getUrl(url_type) + "/update/" + _id, entity);
  }

}