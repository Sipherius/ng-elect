import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class KonsensService {

    private APILIST = '/assets/data/list.json';
    private APIQUESTION = '/assets/data/{0}/statement.json';
    private APIANSWER = '/assets/data/template/answer.json';
    private APIPARTY = '/assets/data/{0}/party.json';
    private APIOPINION = '/assets/data/{0}/opinion.json';

    constructor(private _http: Http) {
    }

    getList() {
        return this.getData(this.APILIST);
    }

    getQuestions(selection: string) {
        return this.getData(this.APIQUESTION.replace('{0}', selection));
    }

    getAnswers() {
        return this.getData(this.APIANSWER);
    }


    getOpinions(selection: string) {
        return this.getData(this.APIOPINION.replace('{0}', selection));
    }

    getParties(selection: string) {
        return this.getData(this.APIPARTY.replace('{0}', selection));
    }

    private getData(url: string) {
        return this._http.get(url)
            .map((res: Response) => {
                return res.json()
            }).catch(error => Observable.throw(error.json()));
    }

}