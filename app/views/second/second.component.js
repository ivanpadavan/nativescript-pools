"use strict";
var core_1 = require('@angular/core');
var nativescript_angular_1 = require("nativescript-angular");
var localStorage_service_1 = require("../../services/localStorage.service");
var questions_service_1 = require("../../services/questions.service");
var dialogsModule = require("ui/dialogs");
var images_service_1 = require("../../services/images.service");
require("nativescript-master-technology");
var immersive = require("./../immersive");
var SecondComponent = (function () {
    function SecondComponent(routerExtensions, questionsService, imagesService) {
        this.routerExtensions = routerExtensions;
        this.questionsService = questionsService;
        this.imagesService = imagesService;
        this.loading = false;
    }
    SecondComponent.prototype.ngOnInit = function () {
        this.token = localStorage_service_1.LocalStorageService.token || "";
        this.apiUrl = localStorage_service_1.LocalStorageService.apiUrl || "";
        this.tickerText = localStorage_service_1.LocalStorageService.tickerText || "";
        immersive.disableImmersive();
        this.questionsService.getQuestions();
    };
    SecondComponent.prototype.saveApiUrl = function () {
        localStorage_service_1.LocalStorageService.apiUrl = this.apiUrl;
    };
    SecondComponent.prototype.saveToken = function () {
        localStorage_service_1.LocalStorageService.token = this.token;
    };
    SecondComponent.prototype.saveTickerText = function () {
        localStorage_service_1.LocalStorageService.tickerText = this.tickerText;
    };
    SecondComponent.prototype.pressEventHandler = function (e) {
        if (this.apiUrlRef.nativeElement.toString() == e['object'].toString())
            this.tokenRef.nativeElement.focus();
        else if (this.tokenRef.nativeElement.toString() == e['object'].toString())
            this.getQuestions();
        else
            this.apiUrlRef.nativeElement.focus();
    };
    SecondComponent.prototype.getQuestions = function () {
        var _this = this;
        this.loading = true;
        this.questionsService.getQuestions().subscribe(function (ans) { console.log('good'); _this.routerExtensions.navigate(['/first'], { transition: { name: 'slideTop' } }); }, function (err) { console.log('bad'); _this.errorMsg = err[0]; _this.errorVerbose = err[1]; }).add(function () { return _this.loading = false; });
    };
    SecondComponent.prototype.verboseError = function () {
        dialogsModule.alert({
            title: "Подробности",
            okButtonText: "OK",
            message: this.errorVerbose
        });
    };
    SecondComponent.prototype.clearQuestionData = function () {
        localStorage_service_1.LocalStorageService.questions = "";
    };
    SecondComponent.prototype.loadImages = function () {
        var _this = this;
        this.loading = true;
        var isLoaded = [false, false];
        this.imagesService.downloadAndSave('landscape').then(function () {
            isLoaded[1] = true;
            console.log(isLoaded);
            if (isLoaded[0] == true && isLoaded[1] == true) {
                global.process.restart();
            }
        }, function (e) {
            dialogsModule.alert({
                title: "Загрузка не удалась",
                okButtonText: "OK",
                message: JSON.stringify(e)
            });
            _this.loading = false;
        });
        this.imagesService.downloadAndSave('portrait').then(function () {
            isLoaded[0] = true;
            console.log(isLoaded);
            if (isLoaded[0] == true && isLoaded[1] == true) {
                global.process.restart();
            }
        }, function (e) {
            dialogsModule.alert({
                title: "Загрузка не удалась",
                okButtonText: "OK",
                message: JSON.stringify(e)
            });
            _this.loading = false;
        });
    };
    SecondComponent.prototype.removeImages = function () {
        this.imagesService.removeImages();
        console.log(global.process.restart());
    };
    __decorate([
        core_1.ViewChild('apiUrlRef'), 
        __metadata('design:type', core_1.ElementRef)
    ], SecondComponent.prototype, "apiUrlRef", void 0);
    __decorate([
        core_1.ViewChild('tokenRef'), 
        __metadata('design:type', core_1.ElementRef)
    ], SecondComponent.prototype, "tokenRef", void 0);
    SecondComponent = __decorate([
        core_1.Component({
            selector: '',
            template: "\n            <ActionBar title=\"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438\" class=\"action-bar\">\n                <NavigationButton text=\"Go Back\" android.systemIcon=\"ic_menu_back\" [nsRouterLink]=\"['/first']\" clearHistory=\"true\" pageTransition=\"slideUp\" class=\"action-item\"></NavigationButton>\n            </ActionBar>\n            <ScrollView>\n            <StackLayout>\n                <StackLayout class=\"form m-5\" borderColor=\"#e0e0e0\" borderWidth=\"1\">\n                    <StackLayout class=\"input-field\">\n                         <Label class=\"h3\" text=\"\u0411\u0435\u0433\u0443\u0449\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \"></Label>\n                         <TextField class=\"input-border\" returnKeyType=\"done\" [(ngModel)]=\"tickerText\" (ngModelChange)=\"saveTickerText()\"></TextField>\n                    </StackLayout>\n                    \n                    <StackLayout class=\"input-field\">\n                         <Label class=\"h3\" text=\"\u0410\u0434\u0440\u0435\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: \"></Label>\n                         <TextField #apiUrlRef class=\"input-border\" returnKeyType=\"done\" [(ngModel)]=\"apiUrl\" (ngModelChange)=\"saveApiUrl()\" (returnPress)=\"pressEventHandler($event)\"></TextField>\n                    </StackLayout>\n                    \n                    <StackLayout class=\"hr-light\"></StackLayout>\n                    \n                    <StackLayout class=\"input-field\">\n                         <Label class=\"h3\" text=\"\u0422\u043E\u043A\u0435\u043D: \"></Label>\n                         <TextField #tokenRef class=\"input-border\" returnKeyType=\"done\" [(ngModel)]=\"token\" (ngModelChange)=\"saveToken()\" (returnPress)=\"pressEventHandler($event)\"></TextField>\n                    </StackLayout>\n                    \n                    <StackLayout class=\"hr-light\"></StackLayout>\n                    \n                </StackLayout>\n                <Button text=\"\u0421\u0442\u0435\u0440\u0435\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430\" class=\"btn btn-primary\" (tap)=\"clearQuestionData()\"></Button>\n                <GridLayout *ngIf=\"questionsService.questions.length>0\" columns=\"*,*\">\n                    <Button text=\"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0431\u0430\u043D\u043D\u0435\u0440\" class=\"btn btn-primary\" (tap)=\"loadImages()\" col=\"0\"></Button>\n                    <Button text=\"\u0423\u0434\u0430\u043B\u0438\u0442\u044C   \u0431\u0430\u043D\u043D\u0435\u0440\" class=\"btn btn-primary\" (tap)=\"removeImages()\" col=\"1\"></Button>\n                </GridLayout>\n                <StackLayout *ngIf=\"errorMsg && !loading\">\n                     <Label textWrap=\"true\" class=\"text-danger h3\" [text]=\"errorMsg\" backgroundColor=\"white\"></Label>\n                     <button class=\"btn btn-primary\" text=\"Show more\" (tap)=\"verboseError()\"></button>\n                </StackLayout>\n                <ActivityIndicator flexGrow=\"1\" busy=\"true\" *ngIf=\"loading\"></ActivityIndicator>\n            </StackLayout>\n            </ScrollView>\n        "
        }), 
        __metadata('design:paramtypes', [nativescript_angular_1.RouterExtensions, questions_service_1.QuestionsService, images_service_1.ImagesService])
    ], SecondComponent);
    return SecondComponent;
}());
exports.SecondComponent = SecondComponent;
//# sourceMappingURL=second.component.js.map