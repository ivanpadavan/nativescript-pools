import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {RouterExtensions} from "nativescript-angular";
import {LocalStorageService} from "../../services/localStorage.service";
import {QuestionsService} from "../../services/questions.service";
import * as dialogsModule from "ui/dialogs";
import {ImagesService} from "../../services/images.service";

require( "nativescript-master-technology" );
let immersive = require( "./../immersive" )

      @Component({
        selector: '',
        templateUrl: 'second.component.html'
      })
      export class SecondComponent implements OnInit {
        public token: string;
        public apiUrl: string;
        public tickerText: string;
        public errorMsg: string;
        public errorVerbose: string;
        public loading = false;
        @ViewChild('apiUrlRef') apiUrlRef: ElementRef;
        @ViewChild('tokenRef') tokenRef: ElementRef;


        constructor(private routerExtensions: RouterExtensions, public questionsService: QuestionsService,
                    private imagesService: ImagesService) {
        }

        ngOnInit() {
            this.token = LocalStorageService.token || "";
            this.apiUrl = LocalStorageService.apiUrl || "";
            this.tickerText = LocalStorageService.tickerText || "";

            immersive.disableImmersive();

            this.questionsService.getQuestions();
        }


        saveApiUrl() :void {
              LocalStorageService.apiUrl = this.apiUrl;
        }

        saveToken() :void {
            LocalStorageService.token = this.token;
        }
        saveTickerText() :void {
            LocalStorageService.tickerText = this.tickerText;
        }

        pressEventHandler(e) {
            if ( this.apiUrlRef.nativeElement.toString() == e['object'].toString() ) this.tokenRef.nativeElement.focus();
            else if ( this.tokenRef.nativeElement.toString() == e['object'].toString() ) this.getQuestions()
            else this.apiUrlRef.nativeElement.focus();
        }

        public getQuestions() {
            this.loading=true;

            this.questionsService.getQuestions().subscribe(
                (ans)=>{console.log('good');this.routerExtensions.navigate(['/first'], {transition: {name: 'slideTop'}})},
                (err)=>{console.log('bad');this.errorMsg = err[0];this.errorVerbose = err[1]},
            ).add(()=>this.loading=false)
        }

        public verboseError() {
            dialogsModule.alert({
                title: "Подробности",
                okButtonText: "OK",
                message: this.errorVerbose
            })
        }
        public clearQuestionData() {
            LocalStorageService.questions = "";
        }



        public loadImages() {
            this.loading = true;

            let isLoaded = [false, false]
            this.imagesService.downloadAndSave('landscape').then(
                ()=> {
                    isLoaded[1] = true;
                    console.log(isLoaded)
                    if (isLoaded[0] == true && isLoaded[1] == true) {
                        global.process.restart();
                   }
                },
                (e) => {
                    dialogsModule.alert({
                        title: "Загрузка не удалась",
                        okButtonText: "OK",
                        message: JSON.stringify(e)
                    })
                    this.loading = false;
                }
            )
            this.imagesService.downloadAndSave('portrait').then(
                ()=> {
                    isLoaded[0] = true;
                    console.log(isLoaded)
                    if (isLoaded[0] == true && isLoaded[1] == true) {
                        global.process.restart();
                    }
                },
                (e) => {
                    dialogsModule.alert({
                        title: "Загрузка не удалась",
                        okButtonText: "OK",
                        message: JSON.stringify(e)
                    })
                    this.loading = false;
                }
            )
        }

        public removeImages() {
            this.imagesService.removeImages()
            console.log(global.process.restart())
        }











      }
