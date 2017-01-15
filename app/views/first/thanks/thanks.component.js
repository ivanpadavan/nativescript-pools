"use strict";
/**
 * Created by user on 02.01.17.
 */
var core_1 = require('@angular/core');
var timer_1 = require("timer");
var nativescript_angular_1 = require("nativescript-angular");
var ThanksComponent = (function () {
    function ThanksComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.state = 'in';
    }
    ThanksComponent.prototype.ngOnInit = function () {
        var _this = this;
        timer_1.setTimeout(function () {
            _this.state = "void";
            timer_1.setTimeout(function () { _this.routerExtensions.navigate(['/first']); }, 600);
        }, 10000);
    };
    ThanksComponent.prototype.ngOnDestroy = function () {
    };
    ThanksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'selector',
            templateUrl: 'thanks.component.html',
            animations: [
                core_1.trigger('state', [
                    core_1.state('in', core_1.style({ 'transform': 'translateX(0)', 'opacity': 0.7 })),
                    core_1.state('void', core_1.style({ 'transform': 'translateX(-100%)', 'opacity': 0 })),
                    core_1.transition('void => *', [core_1.animate('600ms ease-out')]),
                    core_1.transition('* => void', [core_1.animate('600ms ease-out')])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [nativescript_angular_1.RouterExtensions])
    ], ThanksComponent);
    return ThanksComponent;
}());
exports.ThanksComponent = ThanksComponent;
//# sourceMappingURL=thanks.component.js.map