import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class RoutesService {

  private APILIST = '/assets/routes.json';

  constructor(private _http?: Http) {}

  getRoutes() {
    return this.getData(this.APILIST);
  }

  private getData(url: string) {
    return this._http.get(url)
        .map((res: Response) => {
          return res.json()
        }).catch(error => Observable.throw(error.json()));
  }

}