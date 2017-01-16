/**
 * Created by user on 02.01.17.
 */
import {Component, OnInit, OnDestroy, trigger, state, style, transition, animate} from '@angular/core';
import {QuestionsService} from "../../../services/questions.service";
import {RouterExtensions} from "nativescript-angular";
import {ActivatedRoute} from "@angular/router";
import {setTimeout, clearTimeout} from 'timer';
import {OrientationService} from "../../../services/orientation.service";


@Component({
    selector: 'question',
    templateUrl: 'question.component.html',
    styles: [`
        .selected {
            background-color: white;
        }
    `],
    animations: [
    trigger('state', [
        state('in', style({ 'transform': 'translateX(0)', 'opacity': 1 })),
        state('out', style({ 'transform': 'translateX(-300%)', 'opacity': 0 })),
        state('void', style({ 'transform': 'translateX(300%)', 'opacity': 0 })),
        transition('void => *', [ animate('600ms ease-out')]),
        transition('in => out', [ animate('600ms ease-out')]),
        transition('* => void', [ animate('600ms ease-out')])
    ])
]
})

export class QuestionComponent implements OnInit, OnDestroy {
    private question:any;
    private title:string;
    private sub: any;
    private timer: any;
    private orientation: string;
    public state: string = 'in';
    public answerId:number;
    constructor(private qs: QuestionsService, private routerExtensions: RouterExtensions,
                private route: ActivatedRoute, private orientationService: OrientationService) { }


    ngOnInit() {
        /*Подписка на смену номера вопроса*/
        this.sub = this.route.params.subscribe(params => {
            this.question = this.qs.getQuestion()
            this.title = `${this.qs.state.next+1}/${this.qs.state.overall}`

            if (this.timer) {
                console.log('a')
                clearTimeout(this.timer)
            }

            this.timer = setTimeout(() => {
                this.state= 'void';
                setTimeout(()=>{
                    this.qs.sendNotAllTheAnswers()
                    this.routerExtensions.navigate(['/']);
                }, 600)
            }, 20000)
        });



        this.orientationService.orientationChanged
            .startWith(this.orientationService.getOrientation())
            .subscribe((orientation) => {
                this.orientation = orientation;
            })
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        clearTimeout(this.timer)
    }

    private sendAnswer(answerId) { /*Отправляет ответ и запускает анимацию*/
        if ((this.answerId!=undefined || answerId!=undefined) && this.state!="out") {
            this.state="out";
            setTimeout(() => {
                this.routerExtensions.navigate(this.qs.next(this.answerId || answerId));
                this.state="void";
                setTimeout(()=> this.state="in", 0)
                this.answerId=undefined;
            }, 600)
        }

    }


    private onRadioTap(e) {
        this.answerId = e;
    }
}