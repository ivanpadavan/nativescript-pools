"use strict";
/**
 * Created by user on 10.01.17.
 */
var core_1 = require('@angular/core');
var orientation_service_1 = require("../../services/orientation.service");
var images_service_1 = require("../../services/images.service");
var BannerComponent = (function () {
    function BannerComponent(orientationService, imagesService) {
        this.orientationService = orientationService;
        this.imagesService = imagesService;
    }
    BannerComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("I'm propagating");
        this.orientationService.orientationChanged
            .startWith(this.orientationService.getOrientation())
            .subscribe(function (orientation) {
            _this.src = _this.imagesService.getFilePath(orientation);
        });
    };
    BannerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'banner',
            template: '<Image [src]="src" stretch="aspectFit" dock="bottom"></Image>'
        }), 
        __metadata('design:paramtypes', [orientation_service_1.OrientationService, images_service_1.ImagesService])
    ], BannerComponent);
    return BannerComponent;
}());
exports.BannerComponent = BannerComponent;
//# sourceMappingURL=banner.component.js.map