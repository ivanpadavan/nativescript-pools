import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {RouterExtensions} from "nativescript-angular";
import {LocalStorageService} from "../../services/localStorage.service";
import {QuestionsService} from "../../services/questions.service";
import * as dialogsModule from "ui/dialogs";
import {ImagesService} from "../../services/images.service";
import { SwissArmyKnife } from 'nativescript-swiss-army-knife/nativescript-swiss-army-knife';

require( "nativescript-master-technology" );
let immersive = require( "./../immersive" )

      @Component({
        selector: '',
        template: `
            <ActionBar title="Настройки" class="action-bar">
                <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" [nsRouterLink]="['/first']" clearHistory="true" pageTransition="slideUp" class="action-item"></NavigationButton>
            </ActionBar>
            <ScrollView>
            <StackLayout>
                <StackLayout class="form m-5" borderColor="#e0e0e0" borderWidth="1">
                    <StackLayout class="input-field">
                         <Label class="h3" text="Бегущая строка: "></Label>
                         <TextField class="input-border" returnKeyType="done" [(ngModel)]="tickerText" (ngModelChange)="saveTickerText()"></TextField>
                    </StackLayout>
                    
                    <StackLayout class="input-field">
                         <Label class="h3" text="Адрес сервера: "></Label>
                         <TextField #apiUrlRef class="input-border" returnKeyType="done" [(ngModel)]="apiUrl" (ngModelChange)="saveApiUrl()" (returnPress)="pressEventHandler($event)"></TextField>
                    </StackLayout>
                    
                    <StackLayout class="hr-light"></StackLayout>
                    
                    <StackLayout class="input-field">
                         <Label class="h3" text="Токен: "></Label>
                         <TextField #tokenRef class="input-border" returnKeyType="done" [(ngModel)]="token" (ngModelChange)="saveToken()" (returnPress)="pressEventHandler($event)"></TextField>
                    </StackLayout>
                    
                    <StackLayout class="hr-light"></StackLayout>
                    
                </StackLayout>
                <Button text="Стереть данные для входа" class="btn btn-primary" (tap)="clearQuestionData()"></Button>
                <GridLayout *ngIf="questionsService.questions.length>0" columns="*,*">
                    <Button text="Загрузить баннер" class="btn btn-primary" (tap)="loadImages()" col="0"></Button>
                    <Button text="Удалить   баннер" class="btn btn-primary" (tap)="removeImages()" col="1"></Button>
                </GridLayout>
                <StackLayout *ngIf="errorMsg && !loading">
                     <Label textWrap="true" class="text-danger h3" [text]="errorMsg" backgroundColor="white"></Label>
                     <button class="btn btn-primary" text="Show more" (tap)="verboseError()"></button>
                </StackLayout>
                <ActivityIndicator flexGrow="1" busy="true" *ngIf="loading"></ActivityIndicator>
            </StackLayout>
            </ScrollView>
        `
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
