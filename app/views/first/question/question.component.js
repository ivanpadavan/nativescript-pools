"use strict";
/**
 * Created by user on 02.01.17.
 */
var core_1 = require('@angular/core');
var questions_service_1 = require("../../../services/questions.service");
var nativescript_angular_1 = require("nativescript-angular");
var router_1 = require("@angular/router");
var timer_1 = require('timer');
var orientation_service_1 = require("../../../services/orientation.service");
var QuestionComponent = (function () {
    function QuestionComponent(qs, routerExtensions, route, orientationService) {
        this.qs = qs;
        this.routerExtensions = routerExtensions;
        this.route = route;
        this.orientationService = orientationService;
        this.state = 'in';
    }
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*Подписка на смену номера вопроса*/
        this.sub = this.route.params.subscribe(function (params) {
            _this.question = _this.qs.getQuestion();
            _this.title = (_this.qs.state.next + 1) + "/" + _this.qs.state.overall;
            if (_this.timer) {
                console.log('a');
                timer_1.clearTimeout(_this.timer);
            }
            _this.timer = timer_1.setTimeout(function () {
                _this.state = 'void';
                timer_1.setTimeout(function () {
                    _this.qs.sendNotAllTheAnswers();
                    _this.routerExtensions.navigate(['/']);
                }, 600);
            }, 20000);
        });
        this.orientationService.orientationChanged
            .startWith(this.orientationService.getOrientation())
            .subscribe(function (orientation) {
            _this.orientation = orientation;
        });
    };
    QuestionComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        timer_1.clearTimeout(this.timer);
    };
    QuestionComponent.prototype.sendAnswer = function (answerId) {
        var _this = this;
        if ((this.answerId != undefined || answerId != undefined) && this.state != "out") {
            this.state = "out";
            timer_1.setTimeout(function () {
                _this.routerExtensions.navigate(_this.qs.next(_this.answerId || answerId));
                _this.state = "void";
                timer_1.setTimeout(function () { return _this.state = "in"; }, 0);
                _this.answerId = undefined;
            }, 600);
        }
    };
    QuestionComponent.prototype.onRadioTap = function (e) {
        this.answerId = e;
    };
    QuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question',
            templateUrl: 'question.component.html',
            styles: ["\n        .selected {\n            background-color: white;\n        }\n    "],
            animations: [
                core_1.trigger('state', [
                    core_1.state('in', core_1.style({ 'transform': 'translateX(0)', 'opacity': 1 })),
                    core_1.state('out', core_1.style({ 'transform': 'translateX(-300%)', 'opacity': 0 })),
                    core_1.state('void', core_1.style({ 'transform': 'translateX(300%)', 'opacity': 0 })),
                    core_1.transition('void => *', [core_1.animate('600ms ease-out')]),
                    core_1.transition('in => out', [core_1.animate('600ms ease-out')]),
                    core_1.transition('* => void', [core_1.animate('600ms ease-out')])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [questions_service_1.QuestionsService, nativescript_angular_1.RouterExtensions, router_1.ActivatedRoute, orientation_service_1.OrientationService])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map