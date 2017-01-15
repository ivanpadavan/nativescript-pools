"use strict";
var core_1 = require('@angular/core');
var page_1 = require("ui/page");
var images_service_1 = require("../../services/images.service");
var nativescript_angular_1 = require("nativescript-angular");
var Rx = require("rxjs");
var localStorage_service_1 = require("../../services/localStorage.service");
var FirstComponent = (function () {
    function FirstComponent(page, routerExtensions, imagesService) {
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.imagesService = imagesService;
    }
    FirstComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tickerText = localStorage_service_1.LocalStorageService.tickerText;
        this.gesturesStream = new Rx.Subject();
        this.gesturesStreamBuffer = this.gesturesStream.buffer(this.gesturesStream.throttleTime(3000));
        this.gesturesStreamBuffer
            .subscribe(function (val) {
            console.log(JSON.stringify(val));
            if (val[0] == 4 && val[1] == 1 && val[2] == 8 && val[3] == 2) {
                [4, 1, 8, 2];
                console.log('here');
                _this.routerExtensions.navigate(['/second'], { transition: { name: 'slideBottom' } });
            }
        });
        this.page.actionBarHidden = true;
    };
    /*imageSource.fromFile("/data/data/org.nativescript.test/files/1.png");*/
    FirstComponent.prototype.globalTap = function () {
        this.gesturesStream.next('tap');
        if (this.routerExtensions.router.url == '/first')
            this.routerExtensions.navigate(['/first/question/0']);
    };
    FirstComponent.prototype.globalSwipe = function (args) {
        this.gesturesStream.next(args.direction);
    };
    FirstComponent = __decorate([
        core_1.Component({
            selector: 'first',
            templateUrl: "./views/first/first.component.html"
        }), 
        __metadata('design:paramtypes', [page_1.Page, nativescript_angular_1.RouterExtensions, images_service_1.ImagesService])
    ], FirstComponent);
    return FirstComponent;
}());
exports.FirstComponent = FirstComponent;
//# sourceMappingURL=first.component.js.map