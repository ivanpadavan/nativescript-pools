"use strict";
var first_component_1 = require("./views/first/first.component");
var second_component_1 = require("./views/second/second.component");
var greeting_component_1 = require("./views/first/greeting/greeting.component");
var question_component_1 = require("./views/first/question/question.component");
var thanks_component_1 = require("./views/first/thanks/thanks.component");
var auth_guard_service_1 = require("./auth-guard.service");
exports.authProviders = [
    auth_guard_service_1.AuthGuard
];
exports.routes = [
    { path: "", redirectTo: "/first", pathMatch: "full" },
    {
        path: "first", component: first_component_1.FirstComponent, canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            { path: "", component: greeting_component_1.GreetingComponent },
            { path: "question/:id", component: question_component_1.QuestionComponent },
            { path: "thanks", component: thanks_component_1.ThanksComponent }
        ]
    },
    { path: "second", component: second_component_1.SecondComponent }
];
//# sourceMappingURL=app.routing.js.map