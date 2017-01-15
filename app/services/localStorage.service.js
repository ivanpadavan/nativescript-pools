"use strict";
/**
 * Created by user on 06.01.17.
 */
var core_1 = require('@angular/core');
var application_settings_1 = require("application-settings");
var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    ;
    LocalStorageService.isLoggedIn = function () {
        console.log("token: " + application_settings_1.getString("token"));
        console.log("apiUrl: " + application_settings_1.getString("apiUrl"));
        console.log(!!application_settings_1.getString("token") && !!application_settings_1.getString("apiUrl"));
        return !!application_settings_1.getString("token") && !!application_settings_1.getString("apiUrl");
    };
    Object.defineProperty(LocalStorageService, "token", {
        get: function () {
            return application_settings_1.getString("token");
        },
        set: function (theToken) {
            application_settings_1.setString("token", theToken);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalStorageService, "apiUrl", {
        get: function () {
            return application_settings_1.getString("apiUrl");
        },
        set: function (api) {
            application_settings_1.setString("apiUrl", api);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalStorageService, "questions", {
        get: function () {
            return application_settings_1.getString("questions");
        },
        set: function (api) {
            application_settings_1.setString("questions", api);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalStorageService, "tickerText", {
        get: function () {
            return application_settings_1.getString("tickerText");
        },
        set: function (api) {
            application_settings_1.setString("tickerText", api);
        },
        enumerable: true,
        configurable: true
    });
    LocalStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localStorage.service.js.map