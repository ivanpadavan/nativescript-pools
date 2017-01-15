import {Component, OnInit} from "@angular/core";



@Component({
    selector: "my-app",
    template: "<page-router-outlet></page-router-outlet>",
})
export class AppComponent implements OnInit{
    public counter: number = 0;
    ngOnInit() {

    }

}
