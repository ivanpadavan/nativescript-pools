/**
 * Created by user on 02.01.17.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {LocalStorageService} from "./localStorage.service";
/*
class Answer {
    text: string;
    id: any;
}

export class Question {
    text: string;
    answers: Answer[][];
}
class State {
    next: number;
    overall: number;
    answers: number[];
}*/

@Injectable()
export class QuestionsService {
    public questions: any;
    public state: any;

    constructor(private http: Http) {

        this.questions = JSON.parse(LocalStorageService.questions || '[]');
        this.setState()

    }


    private setState() {
        this.state = {answers: [], overall: this.questions.length, next: 0}
    }

    public getQuestions() {
        return this.http.post(LocalStorageService.apiUrl+'/ws/auth',
            JSON.stringify({
                token: LocalStorageService.token,
                lang: "ru"
            })
        )
            .map(r => {
                if ( r.json().deviceName ) {
                    LocalStorageService.questions = JSON.stringify(r.json().currentPool.questions)

                    return JSON.stringify(r.json())
                }
                else Observable.throw(['JSON format is not okay', r.text()]);
            })
            .do(
                ans => {
                    console.log("Got renewed questions")
                    this.questions = JSON.parse(LocalStorageService.questions || '[]');
                    this.setState()

                },
                err => {
                    console.log("Got old questions")
                    this.questions = JSON.parse(LocalStorageService.questions || '[]');
                    this.setState()
                }
            )
            .catch(r=>{
                console.log('error')
                return Observable.throw([r.toString(), r.text()])
            })
    }

public sendNotAllTheAnswers() {
    console.log(JSON.stringify({
        token: LocalStorageService.token,
        result: this.state.answers
    }))

    return this.http.post(LocalStorageService.apiUrl+'/ws/result',
        JSON.stringify({
            token: LocalStorageService.token,
            result: this.state.answers
        })
    )
        .subscribe(
            ans => {
                console.log('Sending answers sucseed: '+ans.json())
            },
            err => {
                console.log('Sending answers failed: '+err.json())
            }
        ).add(() => {
            console.log('Not full answers sended. Set answer pack to zero')
            this.state.answers = []
            this.state.next=0;
        })
}

public sendAnswers() {
        console.log(JSON.stringify({
            token: LocalStorageService.token,
            result: this.state.answers
        }))

        return this.http.post(LocalStorageService.apiUrl+'/ws/result',
                JSON.stringify({
                    token: LocalStorageService.token,
                    result: this.state.answers
                })
        )
            .subscribe(
                ans => {
                    console.log('Sending answers sucseed: '+ans.json())
                },
                err => {
                    console.log('Sending answers failed: '+err.json())
                }
            ).add(() => {
                console.log('Set answer pack to zero')
                this.state.answers = []
                this.state.next = 0;
        })
}


    public next(ans): any[] {
        this.state.next++;
        this.state.answers.push(ans);
        if (this.state.next == this.state.overall) {
            this.sendAnswers();
            this.state.next = 0;
            return ['/first/thanks']


        }
        console.log('/first/question/'+this.state.next, ans);

        return ['/first/question/', this.state.next];
    }

    public getQuestion() {
        console.log(this.state.next);
        return this.questions[this.state.next]
    }
}