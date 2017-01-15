"use strict";
var core_1 = require('@angular/core');
var http_1 = require("http");
var fs = require("file-system");
var localStorage_service_1 = require("./localStorage.service");
var orientation_service_1 = require("./orientation.service");
var ImagesService = (function () {
    function ImagesService(orientationService) {
        this.orientationService = orientationService;
    }
    ImagesService.prototype.getFilePath = function (filename) {
        return fs.path.join(fs.knownFolders.documents().path, filename);
    };
    ImagesService.prototype.downloadAndSave = function (orientation) {
        var folder = fs.knownFolders.documents();
        var file = fs.path.join(folder.path, orientation);
        return http_1.getFile({ url: localStorage_service_1.LocalStorageService.apiUrl + '/ws/splash', method: 'POST', content: JSON.stringify({
                token: localStorage_service_1.LocalStorageService.token,
                orientation: orientation
            }) }, file).then(function (f) {
            console.log("File exsists: " + fs.File.exists(file));
        }, function (e) {
            folder.getFile(orientation).remove();
        });
    };
    ImagesService.prototype.removeImages = function () {
        var folder = fs.knownFolders.documents();
        folder.getFile('portrait').remove();
        folder.getFile('landscape').remove();
    };
    ImagesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [orientation_service_1.OrientationService])
    ], ImagesService);
    return ImagesService;
}());
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map