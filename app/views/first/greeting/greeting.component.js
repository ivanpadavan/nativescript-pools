"use strict";
/**
 * Created by user on 02.01.17.
 */
var core_1 = require('@angular/core');
var immersive = require('./../../immersive');
var GreetingComponent = (function () {
    function GreetingComponent() {
    }
    GreetingComponent.prototype.ngOnInit = function () {
        immersive.enableImmersive();
    };
    GreetingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'selector',
            templateUrl: 'greeting.component.html',
            animations: [
                core_1.trigger('state', [
                    core_1.state('in', core_1.style({ 'transform': 'translateX(0)', 'opacity': 1 })),
                    core_1.state('void', core_1.style({ 'transform': 'translateX(-100%)', 'opacity': 0 })),
                    core_1.transition('void => *', [core_1.animate('600ms ease-out')]),
                    core_1.transition('* => void', [core_1.animate('600ms ease-out')])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], GreetingComponent);
    return GreetingComponent;
}());
exports.GreetingComponent = GreetingComponent;
//# sourceMappingURL=greeting.component.js.map