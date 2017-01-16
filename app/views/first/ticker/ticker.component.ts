import {
    Component, OnInit, Input, ElementRef, ViewChild,
} from '@angular/core';
import {setInterval/*, clearInterval*/} from 'timer';
import {registerElement} from "nativescript-angular/element-registry";
import {OrientationService} from "../../../services/orientation.service";



registerElement("myLabel", () => require('./label').label.Label);

@Component({
    selector: 'ticker',
    styles: [`
        Label {
            color: white;
            font-size: 24px;
            margin-left: 50px;
        }
        StackLayout {
            margin-top: 100%;
            background-color: black;
        }
            `],
    template: `<StackLayout orientation="horizontal" height="35">
                   <myLabel #labelone [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
                   <myLabel [text]="text"></myLabel>
               </StackLayout>`
})
export class TickerComponent implements OnInit {
    @Input()  text: string;
    @ViewChild("labelone") labelone: ElementRef;
    public screenWidth: number;
    public labelWidth: number = 0;
    public animation: any;
    constructor(private orientationService: OrientationService) {

    }


    startAnimation() {
        this.animation = setInterval(() => {
            let loc = this.labelone.nativeElement.getLocationOnScreen();
            this.labelWidth = this.labelone.nativeElement.getMeasuredWidth();

            if (loc && this.labelWidth) {
                this.labelone.nativeElement.marginLeft--

                if (loc.x*-2>=this.labelWidth) {
                    this.labelone.nativeElement.marginLeft=50;
                }
            }

        }, 10)
    }

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

    ngOnInit() {
        /*let init = setInterval(() => {
            if (this.labelone.nativeElement.getMeasuredWidth()) {
                console.log(`Width measured: ${this.labelone.nativeElement.getMeasuredWidth()}`);
                this.eventDrivenAnimationHandling();
                clearInterval(init);

            }
        }, 10)*/
        this.startAnimation()
    }
}