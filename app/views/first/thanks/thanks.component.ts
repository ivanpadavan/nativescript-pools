/**
 * Created by user on 02.01.17.
 */
import {Component, OnInit, OnDestroy, trigger, state, style, transition, animate} from '@angular/core';
import {setTimeout} from "timer";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: 'selector',
    templateUrl: 'thanks.component.html',
    animations: [
        trigger('state', [
            state('in', style({ 'transform': 'translateX(0)', 'opacity': 0.7 })),
            state('void', style({ 'transform': 'translateX(-100%)', 'opacity': 0 })),
            transition('void => *', [ animate('600ms ease-out') ]),
            transition('* => void', [ animate('600ms ease-out')])
        ])
    ]
})
export class ThanksComponent implements OnInit, OnDestroy {
    public state: string = 'in';

    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit() {
        setTimeout(() => {
            this.state="void";

            setTimeout(() => { this.routerExtensions.navigate(['/first']) }, 600);


        }, 10000)
    }

    ngOnDestroy() {

    }

}