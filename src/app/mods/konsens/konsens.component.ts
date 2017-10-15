import {Component, OnInit, ViewChild} from '@angular/core';
import {
    PageEvent,
    MatPaginator,
} from '@angular/material';

import {KonsensService} from '../../services/konsens.service';

@Component({
    selector: 'app-konsens',
    templateUrl: './konsens.component.html',
    styleUrls: ['./konsens.component.scss']
})
export class KonsensComponent implements OnInit {

    floatPlaceholder: any;

    questions: Array<any> = [];
    answers: Array<any> = [];
    parties: Array<any> = [];
    data: Array<any> = [];
    selection: string;
    opinions: Array<any> = [];

    formGroup: any = [];
    validStatements: number = -1;

    // paginator
    length = 0;
    pageSize = 5;
    pageEvent: PageEvent;
    useEvaluateButton = false;

    // progress-bar
    value = 0;
    bufferValue = 100;


    constructor(private _service: KonsensService) {
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
        this.getParties();
        this.getQuestions();
        this.getOpinions();
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    onSelectionChange(value, item) {
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
        return ((this.bufferValue) / this.length) * (this.pageEvent.pageIndex + this.pageSize);
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

        this.questions.filter((question, i) => {
            this.answers.filter((answer) => {
                question["answer_" + answer.id] = 0;
            });
        });

        // sort statement array by id asc
        this.questions.sort((a, b) => {
            return a.id - b.id;
        });

        this.opinions.sort((a, b) => {
            if (a.party != b.party) {
                return a.party - b.party;
            }

            return a.statement - b.statement;
        });

        this.answers.sort((a, b) => {
            return a.id - b.id;
        });

        this.questions.filter((question, x) => {
            this.parties.filter((party, y) => {
               let pos = y * this.questions.length + x;
               if(this.opinions[pos].statement === question.id && this.opinions[pos].party === y) {
                   let propName = "answer_" + this.opinions[pos].answer;
                   question[propName]++;
               }
            });
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
                    this.length = data.length;
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
        console.log(this)
        if (this.selection) {
            this._service
                .getParties(this.selection)
                .subscribe(data => {
                    console.log(data)
                    this.parties = data;
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
        this.pageEvent = new PageEvent;
        this.pageEvent.pageIndex = 0;
    }

}
