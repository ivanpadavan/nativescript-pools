/**
 * Created by user on 06.01.17.
 */
import { Injectable } from '@angular/core';
import { getString, setString } from "application-settings";

@Injectable()
export class LocalStorageService {
    constructor() {};
    static isLoggedIn(): boolean {
        console.log("token: "+getString("token"));
        console.log("apiUrl: "+getString("apiUrl"));
        console.log(!!getString("token") && !!getString("apiUrl"))
        return !!getString("token") && !!getString("apiUrl");
    }

    static get token(): string {
        return getString("token");
    }

    static set token(theToken: string) {
        setString("token", theToken);
    }
    static get apiUrl(): string {
        return getString("apiUrl");
    }

    static set apiUrl(api: string) {
        setString("apiUrl", api);
    }

    static get questions(): string {
        return getString("questions");
    }

    static set questions(api: string) {
        setString("questions", api);
    }

    static get tickerText(): string {
        return getString("tickerText");
    }

    static set tickerText(api: string) {
        setString("tickerText", api);
    }
}