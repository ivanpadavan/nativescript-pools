import {Component, OnInit} from '@angular/core';

import { Page } from "ui/page";
import {ImagesService} from "../../services/images.service";
import {RouterExtensions} from "nativescript-angular";
import * as Rx from "rxjs"
import {SwipeGestureEventData} from "ui/gestures";
import {LocalStorageService} from "../../services/localStorage.service";




      @Component({
        selector: 'first',
        templateUrl: `./views/first/first.component.html`
      })
      export class FirstComponent implements OnInit {
          public tickerText: string;
          public gesturesStream: any;
          public gesturesStreamBuffer: any;


          constructor(private page: Page, private routerExtensions: RouterExtensions, private imagesService: ImagesService) { }

          ngOnInit() {
              this.tickerText = LocalStorageService.tickerText;

              this.gesturesStream = new Rx.Subject()
              this.gesturesStreamBuffer = this.gesturesStream.buffer(this.gesturesStream.throttleTime(3000))
              this.gesturesStreamBuffer
                  .subscribe((val) => {
                      console.log(JSON.stringify(val))
                      if (val[0]==4 && val[1]==1 && val[2]==8 && val[3]==2) {[4,1,8,2]
                          console.log('here')
                          this.routerExtensions.navigate(['/second'], {transition: {name: 'slideBottom'}})
                      }
                  })

              this.page.actionBarHidden = true;

          }



            /*imageSource.fromFile("/data/data/org.nativescript.test/files/1.png");*/

          public globalTap() {
              this.gesturesStream.next('tap');
            if (this.routerExtensions.router.url == '/first')
                this.routerExtensions.navigate(['/first/question/0'])
          }
          public globalSwipe(args: SwipeGestureEventData) {
                this.gesturesStream.next(args.direction)
          }
      }

