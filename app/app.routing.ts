import { FirstComponent } from "./views/first/first.component";
import { SecondComponent } from "./views/second/second.component";
import {GreetingComponent} from "./views/first/greeting/greeting.component";
import {QuestionComponent} from "./views/first/question/question.component";
import {ThanksComponent} from "./views/first/thanks/thanks.component";
import {AuthGuard} from "./auth-guard.service";

export const authProviders = [
    AuthGuard
];

export const routes = [
    { path: "", redirectTo: "/first", pathMatch: "full" },
    {
        path: "first", component: FirstComponent, canActivate:[AuthGuard],
        children: [
            {path: "", component: GreetingComponent},
            {path: "question/:id", component: QuestionComponent},
            {path: "thanks", component: ThanksComponent}
        ]
    },
    { path: "second", component: SecondComponent }
];