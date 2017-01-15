"use strict";
/**
 * Created by user on 06.01.17.
 */
var core_1 = require("@angular/core");
var localStorage_service_1 = require("./services/localStorage.service");
var nativescript_angular_1 = require("nativescript-angular");
var AuthGuard = (function () {
    function AuthGuard(routerExtensions) {
        this.routerExtensions = routerExtensions;
    }
    AuthGuard.prototype.canActivate = function () {
        console.log('AuthGuard says ' + !!localStorage_service_1.LocalStorageService.questions + ' with ' + localStorage_service_1.LocalStorageService.questions);
        if (!!localStorage_service_1.LocalStorageService.questions) {
            return true;
        }
        else {
            this.routerExtensions.navigate(["/second"]);
            return false;
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [nativescript_angular_1.RouterExtensions])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth-guard.service.js.map