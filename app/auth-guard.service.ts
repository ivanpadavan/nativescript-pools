/**
 * Created by user on 06.01.17.
 */
import { Injectable } from "@angular/core";
import {CanActivate } from "@angular/router";

import {LocalStorageService} from "./services/localStorage.service"
import {RouterExtensions} from "nativescript-angular";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private routerExtensions: RouterExtensions) { }

    canActivate() {
        console.log('AuthGuard says '+!!LocalStorageService.questions+' with '+LocalStorageService.questions)
        if (!!LocalStorageService.questions) {
            return true;
        }
        else {
            this.routerExtensions.navigate(["/second"]);
            return false;
        }
    }
}