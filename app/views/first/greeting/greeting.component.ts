/**
 * Created by user on 02.01.17.
 */
import {Component, OnInit, trigger, state, transition, animate, style} from '@angular/core';
let immersive = require('./../../immersive')
@Component({
    selector: 'selector',
    templateUrl: 'greeting.component.html',
    animations: [
        trigger('state', [
            state('in', style({ 'transform': 'translateX(0)', 'opacity': 1 })),
            state('void', style({ 'transform': 'translateX(-100%)', 'opacity': 0 })),
            transition('void => *', [ animate('600ms ease-out') ]),
            transition('* => void', [ animate('600ms ease-out')])
        ])
    ]
})
export class GreetingComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        immersive.enableImmersive()
    }

}