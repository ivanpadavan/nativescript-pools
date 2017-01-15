/**
 * Created by user on 10.01.17.
 */
import {Component, OnInit} from '@angular/core';
import {OrientationService} from "../../services/orientation.service";
import {ImagesService} from "../../services/images.service";

@Component({
    moduleId: module.id,
    selector: 'banner',
    template: '<Image [src]="src" stretch="aspectFit" dock="bottom"></Image>'
})
export class BannerComponent implements OnInit {
    private src: any;

    constructor(private orientationService: OrientationService, private imagesService: ImagesService) { }


    ngOnInit() {
        console.log("I'm propagating")
        this.orientationService.orientationChanged
            .startWith(this.orientationService.getOrientation())
            .subscribe((orientation) => {
                this.src = this.imagesService.getFilePath(orientation);
            })
    }

}