"use strict";
/**
 * Created by user on 08.01.17.
 */
var core_1 = require('@angular/core');
var nativescript_swiss_army_knife_1 = require('nativescript-swiss-army-knife/nativescript-swiss-army-knife');
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
var application = require("application");
var getOrientation = require("./orientation.service-getorientation");
var OrientationService = (function () {
    function OrientationService() {
        this.orientationChanged = rxjs_1.Observable
            .fromEvent(application, application.orientationChangedEvent)
            .map(function (e) { return e.newValue; });
    }
    OrientationService.prototype.setTranscluent = function () {
        nativescript_swiss_army_knife_1.SwissArmyKnife.setAndroidNavBarTranslucentFlag();
        nativescript_swiss_army_knife_1.SwissArmyKnife.setAndroidStatusBarTranslucentFlag();
    };
    OrientationService.prototype.getOrientation = function () {
        return getOrientation();
    };
    OrientationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], OrientationService);
    return OrientationService;
}());
exports.OrientationService = OrientationService;
//# sourceMappingURL=orientation.service.js.map