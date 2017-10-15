import {Component, OnInit, ViewChild} from '@angular/core';

import {
    PageEvent,
    MatPaginator,
} from '@angular/material';

import {QuestionsService} from '../../services/questions.service';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

    questions: Array<any> = [];
    answers: Array<any> = [];
    data: Array<any> = [];
    selection: string;
    parties: Array<any> = [];
    opinions: Array<any> = [];

    formGroup: any = [];
    validStatements: number = -1;

    // paginator
    length = 0;
    pageSize = 1;
    pageEvent: PageEvent;
    useEvaluateButton = false;

    // progress-bar
    value = 0;
    bufferValue = 100;


    constructor(private _service: QuestionsService) {
        this.useEvaluateButton = false;
        this.getList();
        this.getAnswers();
    }

    latestChangeEvent(evt) {
        this.pageEvent = new PageEvent;
        this.pageEvent.pageIndex = 0;
        this.selection = evt.value;
        this.validStatements = -1;
        this.formGroup = [];
        this.useEvaluateButton = false;
        this.value = 0;
        if (this.paginator) {
            this.paginator.pageIndex = 0;
        }
        this.getQuestions();
        this.getOpinions();
        this.getParties();
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    onSelectionChange(value, item) {
        let filter = this.formGroup.filter((group) => {
            if (item.id == group.id) {
                return group;
            }
            return false;
        });
        if (filter.length) {
            filter[0].checked = value;
        } else {
            item.checked = value;
            this.formGroup.push(item);
        }

        setTimeout(() => {
            this.paginator.nextPage();
            this.showEvaluateButton();
        }, 500)
    }

    back() {
        this.validStatements = -1;
        this.pageEvent.pageIndex = 0;
        this.useEvaluateButton = false;
    }

    skip() {
        this.paginator.nextPage();
        this.useEvaluateButton = false;
    }

    progress() {
        return ((this.bufferValue) / this.length) * (this.pageEvent.pageIndex + 1);
    }

    onPaginateChange(event) {
        this.showEvaluateButton();
    }

    private showEvaluateButton() {
        if (!this.paginator.hasNextPage()) {
            this.useEvaluateButton = true;
        } else {
            this.useEvaluateButton = false;
        }
    }

    paginationFrom(pageEvent) {
        return ((pageEvent.pageIndex === 0) ? pageEvent.pageIndex : (pageEvent.pageIndex) * pageEvent.pageSize );
    }

    paginationTo(pageEvent) {
        return this.paginationFrom(pageEvent) + this.pageSize;
    }

    evaluate() {

        this.validStatements = 0;

        this.parties.filter((party) => {
            party.result = 0;
            return true;
        });

        // sort party array by id asc
        this.parties.sort((a, b) => {
            return a.id - b.id;
        });

        // sort statement array by id asc
        this.questions.sort((a, b) => {
            return a.id - b.id;
        });

        this.opinions.sort((a, b) => {
            if (a.party != b.party) {
                return a.party - b.party;
            }
            ;
            return a.statement - b.statement;
        });

        this.formGroup.filter((group, i) => {
            if (typeof group.checked !== 'undefined') {
                this.validStatements++;
                // add points for matching statement
                this.parties.filter((party, j) => {
                    // calculate opinion id by party id and statement id
                    var opinionj = j * this.questions.length + group.id;
                    if (this.opinions[opinionj].party === party.id
                        && this.opinions[opinionj].statement === this.questions[i].id
                        && this.opinions[opinionj].answer === group.checked) {
                        party.result++;
                    }
                });
            }
        });
    }

    /**
     * services
     */
    getQuestions() {
        if (this.selection) {
            this._service
                .getQuestions(this.selection)
                .subscribe(data => {
                    this.questions = data;
                    this.length = data.length;
                });
        } else {
            this.questions = [];
            this.selection = null;
        }
    }

    getOpinions() {
        if (this.selection) {
            this._service
                .getOpinions(this.selection)
                .subscribe(data => {
                    this.opinions = data;
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
                    this.parties = data;
                });
        } else {
            this.parties = [];
        }
    }

    getList() {
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

    getAnswers() {
        this._service
            .getAnswers()
            .subscribe(data => {
                this.answers = data;
            });
    }

    ngOnInit() {
        this.pageEvent = new PageEvent;
        this.pageEvent.pageIndex = 0;
    }

}
