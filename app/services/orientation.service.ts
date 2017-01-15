/**
 * Created by user on 08.01.17.
 */
import { Injectable } from '@angular/core';
import { SwissArmyKnife } from 'nativescript-swiss-army-knife/nativescript-swiss-army-knife';
import {Observable} from "rxjs"
import "rxjs/add/operator/map";
import * as application from "application";
let getOrientation=require("./orientation.service-getorientation");


@Injectable()
export class OrientationService {

    public orientationChanged = Observable
        .fromEvent(application, application.orientationChangedEvent)
        .map(function(e: application.OrientationChangedEventData) {return e.newValue});


    constructor() { }

    public setTranscluent() {
        SwissArmyKnife.setAndroidNavBarTranslucentFlag();
        SwissArmyKnife.setAndroidStatusBarTranslucentFlag();
    }
    public getOrientation() {
        return getOrientation()
    }

}