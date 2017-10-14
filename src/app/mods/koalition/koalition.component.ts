import {Component, OnInit, ViewChild} from '@angular/core';
import {
    PageEvent,
    MatPaginator,
} from '@angular/material';

import {KoalitionService} from '../../services/koalition.service';
import {Koalition} from './koalition';

@Component({
    selector: 'app-koalition',
    templateUrl: './koalition.component.html',
    styleUrls: ['./koalition.component.scss']
})
export class KoalitionComponent implements OnInit {

    questions: Array<any> = [];
    answers: Array<any> = [];
    parties: Array<any> = [];
    data: Array<any> = [];
    selection: string;
    opinions: Array<any> = [];
    coalitions: any = [];

    filter: number = -1;
    modus: number = 0;
    result: Array<any> = [];
    basicRowHeight = 32;

    // paginator
    length = 0;
    pageSize = 10;
    pageEvent: PageEvent;

    // progress-bar
    value = 0;
    bufferValue = 100;

    constructor(private _service: KoalitionService) {
        this.getList();
        this.getAnswers();
    }

    latestChangeEvent(evt) {
        this.selection = evt.value;
        this.coalitions = [];
        this.pageEvent = new PageEvent;
        this.pageEvent.pageIndex = 0;
        this.value = 0;
        this.getParties();
        this.getQuestions();
        this.getOpinions();
    }

    latestChangeEvent2(evt) {
        this.filter = evt.value;
        this.evaluate();
        this.filterResults();
        this.pageEvent.pageIndex = 0;
        this.value = 0;
        this.length = this.result.length;
        if(this.paginator) {
            this.paginator.pageIndex = 0;
        }
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    latestChangeEvent3(evt) {
        this.modus = evt;
        this.evaluate();
        this.filterResults();
        this.pageEvent.pageIndex = 0;
        this.value = 0;
        this.length = this.result.length;
        if(this.paginator) {
            this.paginator.pageIndex = 0;
        }
    }


    progress() {
        let percentPerPage =  (this.bufferValue / this.length) ;
        let retVal = Math.ceil(percentPerPage * ((this.pageEvent.pageIndex + 1)  * this.pageSize));
        if(retVal > this.bufferValue) {
            return this.bufferValue;
        }
        return retVal;
    }

    paginationFrom(pageEvent) {
        return ((pageEvent.pageIndex === 0) ? pageEvent.pageIndex : (pageEvent.pageIndex) * pageEvent.pageSize );
    }

    paginationTo(pageEvent) {
        return this.paginationFrom(pageEvent) + this.pageSize;
    }

    onPaginateChange(event) {
    }

    filterResults() {

        this.result = [];
        this.coalitions.sort(function(a, b) {
            return b.match - a.match;
        });
        //this.coalitions.filter((group) => {
        for(let i=0;i<this.coalitions.length;i++) {
            let group = this.coalitions[i];
            if (group.third !== null) {
                if (this.modus === 2) {
                    continue;
                }
                const koal = new Koalition;
                if ((this.filter === -1) || (this.filter === group.first.id)) {
                    koal.match = group.match;
                    koal.first = group.first.name;
                    koal.second = group.second.name;
                    koal.third = group.third.name;
                    this.result.push(koal);
                } else if (this.filter === group.second.id) {
                    koal.match = group.match;
                    koal.first = group.second.name;
                    koal.second = group.first.name;
                    koal.third = group.third.name;
                    this.result.push(koal);
                } else if (this.filter === group.third.id) {
                    koal.match = group.match;
                    koal.first = group.third.name;
                    koal.second = group.first.name;
                    koal.third = group.second.name;
                    this.result.push(koal);
                }

            } else {
                if (this.modus === 3) {
                    continue;
                }
                if ((this.filter === -1) || (this.filter === group.first.id)) {
                    const koal = new Koalition;
                    koal.first = group.first.name;
                    koal.second = group.second.name;
                    koal.match = group.match;
                    this.result.push(koal);
                } else if (this.filter === group.second.id) {
                    const koal = new Koalition;
                    koal.first = group.second.name;
                    koal.second = group.first.name;
                    koal.match = group.match;
                    this.result.push(koal);
                }
            }
        }
        //});

    }

    evaluate() {
        let statementsLength = this.opinions.length / this.parties.length;
        this.coalitions = [];

        this.parties.sort((a, b) => {
            return parseInt(a.id, 10) - parseInt(b.id, 10);
        });

        this.opinions.sort((a, b) => {
            if (a.party !== b.party) {
                return a.party - b.party;
            }
            return a.statement - b.statement;
        });

        // for two party coalitions
        this.parties.filter((party, x) => {
            // only calculate one way (x,y || y,x)
            // and skip if party compared to itself
//            this.parties.filter((party2, y) => {
            for (let y = x + 1; y < this.parties.length; y++) {
                let match = 0;
                let obj = {"first": null, "second": null, "third": null, "match": null};
                obj.first = party;
                obj.second = this.parties[y];
                for (let i = 0; i < statementsLength; i++) {
                    // calculate opinion id by party id and statement id
                    //this.questions.filter((question, i) => {
                    let opx = x * statementsLength + i;
                    let opy = y * statementsLength + i;
                    if (this.opinions[opx].party === x
                        && this.opinions[opy].party === y
                        && this.opinions[opx].statement === this.opinions[opy].statement
                        && this.opinions[opx].answer === this.opinions[opy].answer) {
                        match++;
                    }
                    //});
                }
                obj.match = match;
                this.coalitions.push(obj);

                // for three party coalitions
                // only calculate one way (y,z || z,y)
                // and skip if party compared to itself
                for (let z = y + 1; z < this.parties.length; z++) {
                    match = 0;
                    let obj2 = {"first": null, "second": null, "third": null, "match": null};
                    obj2.first = party;
                    obj2.second = this.parties[y];
                    obj2.third = this.parties[z];

                    for (let i = 0; i < statementsLength; i++) {
                        //this.questions.filter((question, i) => {
                        let opx = x * this.questions.length + i;
                        let opy = y * this.questions.length + i;
                        let opz = z * this.questions.length + i;

                        if (this.opinions[opx].party === x &&
                            this.opinions[opy].party === y &&
                            this.opinions[opz].party === z &&
                            this.opinions[opx].statement === this.opinions[opy].statement &&
                            this.opinions[opy].statement === this.opinions[opz].statement &&
                            this.opinions[opx].answer === this.opinions[opy].answer &&
                            this.opinions[opy].answer === this.opinions[opz].answer
                        ) {
                            match++;
                        }
                    }
                    //});

                    obj2.match = match;
                    this.coalitions.push(obj2);
                }
            }
            //});
        });
    }

    /**
     * services
     */
    getQuestions(): void {

        if (this.selection) {

            this._service.getQuestions(this.selection)
                .subscribe(data => {
                    this.questions = data;
                });

        } else {
            this.questions = [];
            this.selection = null;
        }
    }

    getOpinions(): void {
        if (this.selection) {
            this._service
                .getOpinions(this.selection)
                .subscribe(data => {
                    this.opinions = data;
                    this.evaluate();
                });

        } else {
            this.opinions = [];
        }
    }

    getParties() {
        if (this.selection) {
            this._service
                .getParties(this.selection)
                .subscribe(data => {
                    this.parties = (data);
                });
        } else {
            this.parties = [];
        }
    }

    getList(): void {

        this._service
            .getList()
            .subscribe(data => {
                let results = []
                for (let i of data) {
                    results.push({value: i, viewValue: i});
                }
                this.data = results;
            });

    }

    getAnswers(): void {

        this._service
            .getAnswers()
            .subscribe(data => {
                this.answers = data;
            });

    }

    ngOnInit() {
    }

}
