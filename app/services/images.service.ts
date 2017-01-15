import { Injectable } from '@angular/core';
import {getFile} from "http";

import * as fs from "file-system";
import {LocalStorageService} from "./localStorage.service";
import {OrientationService} from "./orientation.service";


@Injectable()
export class ImagesService {
    public src: string;

    constructor(private orientationService: OrientationService) {}

    public getFilePath(filename) {
        return fs.path.join(fs.knownFolders.documents().path, filename);
    }

    public downloadAndSave(orientation) {
        const folder = fs.knownFolders.documents();
        const file = fs.path.join(folder.path, orientation);

        return getFile({url: LocalStorageService.apiUrl+'/ws/splash', method: 'POST', content: JSON.stringify({
            token: LocalStorageService.token,
            orientation: orientation
        })}, file).then( (f) => {
                console.log("File exsists: " +fs.File.exists(file))
            },
            (e) => {
                folder.getFile(orientation).remove()
            }
        )
    }
    public removeImages() {
        const folder = fs.knownFolders.documents();
        folder.getFile('portrait').remove();
        folder.getFile('landscape').remove();
    }
}