"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var app_component_1 = require("./app.component");
var first_component_1 = require("./views/first/first.component");
var second_component_1 = require("./views/second/second.component");
var nativescript_angular_1 = require("nativescript-angular");
var app_routing_1 = require("./app.routing");
var images_service_1 = require("./services/images.service");
var greeting_component_1 = require("./views/first/greeting/greeting.component");
var question_component_1 = require("./views/first/question/question.component");
var thanks_component_1 = require("./views/first/thanks/thanks.component");
var questions_service_1 = require("./services/questions.service");
var localStorage_service_1 = require("./services/localStorage.service");
var ticker_component_1 = require("./views/first/ticker/ticker.component");
var orientation_service_1 = require("./services/orientation.service");
var banner_component_1 = require("./views/first/banner.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            providers: [
                images_service_1.ImagesService,
                questions_service_1.QuestionsService,
                localStorage_service_1.LocalStorageService,
                orientation_service_1.OrientationService,
                app_routing_1.authProviders
            ],
            declarations: [
                banner_component_1.BannerComponent,
                app_component_1.AppComponent,
                first_component_1.FirstComponent,
                second_component_1.SecondComponent,
                greeting_component_1.GreetingComponent,
                question_component_1.QuestionComponent,
                thanks_component_1.ThanksComponent,
                ticker_component_1.TickerComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            imports: [
                platform_1.NativeScriptModule,
                nativescript_angular_1.NativeScriptHttpModule,
                nativescript_angular_1.NativeScriptFormsModule,
                nativescript_angular_1.NativeScriptRouterModule,
                nativescript_angular_1.NativeScriptRouterModule.forRoot(app_routing_1.routes)
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map