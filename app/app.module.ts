import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";

import { AppComponent } from "./app.component";
import {FirstComponent} from "./views/first/first.component";
import {SecondComponent} from "./views/second/second.component";

import {NativeScriptRouterModule, NativeScriptHttpModule, NativeScriptFormsModule} from "nativescript-angular";
import {routes, authProviders} from "./app.routing";
import {ImagesService} from "./services/images.service";
import {GreetingComponent} from "./views/first/greeting/greeting.component";
import {QuestionComponent} from "./views/first/question/question.component";
import {ThanksComponent} from "./views/first/thanks/thanks.component";
import {QuestionsService} from "./services/questions.service";
import {LocalStorageService} from "./services/localStorage.service";
import {TickerComponent} from "./views/first/ticker/ticker.component";
import {OrientationService} from "./services/orientation.service";
import {BannerComponent} from "./views/first/banner.component";


@NgModule({
    providers: [
        ImagesService,
        QuestionsService,
        LocalStorageService,
        OrientationService,
        authProviders
    ],
    declarations: [
        BannerComponent,
        AppComponent,
        FirstComponent,
        SecondComponent,
        GreetingComponent,
        QuestionComponent,
        ThanksComponent,
        TickerComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
