"use strict";
var core_1 = require('@angular/core');
var timer_1 = require('timer');
var element_registry_1 = require("nativescript-angular/element-registry");
var orientation_service_1 = require("../../../services/orientation.service");
element_registry_1.registerElement("myLabel", function () { return require('./label').label.Label; });
var TickerComponent = (function () {
    function TickerComponent(orientationService) {
        this.orientationService = orientationService;
        this.labelWidth = 0;
    }
    TickerComponent.prototype.startAnimation = function () {
        var _this = this;
        this.animation = timer_1.setInterval(function () {
            var loc = _this.labelone.nativeElement.getLocationOnScreen();
            _this.labelWidth = _this.labelone.nativeElement.getMeasuredWidth();
            if (loc && _this.labelWidth) {
                _this.labelone.nativeElement.marginLeft--;
                if (loc.x * -2 >= _this.labelWidth) {
                    _this.labelone.nativeElement.marginLeft = 50;
                }
            }
        }, 10);
    };
    /*    stopAnimation() {
            clearInterval(this.animation);
        }
    
        eventDrivenAnimationHandling() {
            this.orientationService.orientationChanged.startWith(this.orientationService.getOrientation()).subscribe((res) => {
                this.labelWidth = this.labelone.nativeElement.getMeasuredWidth();
    
                this.screenWidth = res == 'portrait' ? this.screenWidth = this.orientationService.portraitWidth
                    : this.screenWidth = this.orientationService.landscapeWidth;
    
                console.log(`Orientation changed. Screen width: ${this.screenWidth}. Label width: ${this.labelWidth}`)
    
                if (this.screenWidth < this.labelWidth) this.startAnimation();
                else this.stopAnimation();
            })
        } */
    TickerComponent.prototype.ngOnInit = function () {
        /*let init = setInterval(() => {
            if (this.labelone.nativeElement.getMeasuredWidth()) {
                console.log(`Width measured: ${this.labelone.nativeElement.getMeasuredWidth()}`);
                this.eventDrivenAnimationHandling();
                clearInterval(init);

            }
        }, 10)*/
        this.startAnimation();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TickerComponent.prototype, "text", void 0);
    __decorate([
        core_1.ViewChild("labelone"), 
        __metadata('design:type', core_1.ElementRef)
    ], TickerComponent.prototype, "labelone", void 0);
    TickerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ticker',
            styles: ["\n        Label {\n            color: white;\n            font-size: 24px;\n            margin-left: 50px;\n        }\n        StackLayout {\n            margin-top: 100%;\n            background-color: black;\n        }\n            "],
            template: "<StackLayout orientation=\"horizontal\" height=\"35\">\n                   <myLabel #labelone [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n                   <myLabel [text]=\"text\"></myLabel>\n               </StackLayout>"
        }), 
        __metadata('design:paramtypes', [orientation_service_1.OrientationService])
    ], TickerComponent);
    return TickerComponent;
}());
exports.TickerComponent = TickerComponent;
//# sourceMappingURL=ticker.component.js.map