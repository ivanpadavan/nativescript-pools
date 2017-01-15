"use strict";
/**
 * Created by user on 02.01.17.
 */
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var localStorage_service_1 = require("./localStorage.service");
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
var QuestionsService = (function () {
    function QuestionsService(http) {
        this.http = http;
        this.questions = JSON.parse(localStorage_service_1.LocalStorageService.questions || '[]');
        this.setState();
    }
    QuestionsService.prototype.setState = function () {
        this.state = { answers: [], overall: this.questions.length, next: 0 };
    };
    QuestionsService.prototype.getQuestions = function () {
        var _this = this;
        return this.http.post(localStorage_service_1.LocalStorageService.apiUrl + '/ws/auth', JSON.stringify({
            token: localStorage_service_1.LocalStorageService.token,
            lang: "ru"
        }))
            .map(function (r) {
            if (r.json().deviceName) {
                localStorage_service_1.LocalStorageService.questions = JSON.stringify(r.json().currentPool.questions);
                return JSON.stringify(r.json());
            }
            else
                Rx_1.Observable.throw(['JSON format is not okay', r.text()]);
        })
            .do(function (ans) {
            console.log("Got renewed questions");
            _this.questions = JSON.parse(localStorage_service_1.LocalStorageService.questions || '[]');
            _this.setState();
        }, function (err) {
            console.log("Got old questions");
            _this.questions = JSON.parse(localStorage_service_1.LocalStorageService.questions || '[]');
            _this.setState();
        })
            .catch(function (r) {
            console.log('error');
            return Rx_1.Observable.throw([r.toString(), r.text()]);
        });
    };
    QuestionsService.prototype.sendNotAllTheAnswers = function () {
        var _this = this;
        console.log(JSON.stringify({
            token: localStorage_service_1.LocalStorageService.token,
            result: this.state.answers
        }));
        return this.http.post(localStorage_service_1.LocalStorageService.apiUrl + '/ws/result', JSON.stringify({
            token: localStorage_service_1.LocalStorageService.token,
            result: this.state.answers
        }))
            .subscribe(function (ans) {
            console.log('Sending answers sucseed: ' + ans.json());
        }, function (err) {
            console.log('Sending answers failed: ' + err.json());
        }).add(function () {
            console.log('Not full answers sended. Set answer pack to zero');
            _this.state.answers = [];
            _this.state.next = 0;
        });
    };
    QuestionsService.prototype.sendAnswers = function () {
        var _this = this;
        console.log(JSON.stringify({
            token: localStorage_service_1.LocalStorageService.token,
            result: this.state.answers
        }));
        return this.http.post(localStorage_service_1.LocalStorageService.apiUrl + '/ws/result', JSON.stringify({
            token: localStorage_service_1.LocalStorageService.token,
            result: this.state.answers
        }))
            .subscribe(function (ans) {
            console.log('Sending answers sucseed: ' + ans.json());
        }, function (err) {
            console.log('Sending answers failed: ' + err.json());
        }).add(function () {
            console.log('Set answer pack to zero');
            _this.state.answers = [];
            _this.state.next = 0;
        });
    };
    QuestionsService.prototype.next = function (ans) {
        this.state.next++;
        this.state.answers.push(ans);
        if (this.state.next == this.state.overall) {
            this.sendAnswers();
            this.state.next = 0;
            return ['/first/thanks'];
        }
        console.log('/first/question/' + this.state.next, ans);
        return ['/first/question/', this.state.next];
    };
    QuestionsService.prototype.getQuestion = function () {
        console.log(this.state.next);
        return this.questions[this.state.next];
    };
    QuestionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuestionsService);
    return QuestionsService;
}());
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map