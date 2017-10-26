import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { config } from '../../app/app.config';


@Injectable()
export class ApifaceProvider {

  private urlDetect = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender,glasses';
  // private urlPerson = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}/persistedFaces?';
  // private urlID = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify';
  private urlGroup = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/';
  private urlVerify = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify';

  constructor(public http: Http) { }

  getDataImg(imageUrl) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': config.apiKeyMicrosoft
    });
    const options = new RequestOptions({ headers });

    return this.http.post(this.urlDetect,  {url: imageUrl}, options)
      .map(data => data.json());
  }

  getVerifyImgs(idFace1, idFace2) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': config.apiKeyMicrosoft
    });
    const options = new RequestOptions({ headers });

    let bodyData =  {
      "faceId1" : idFace1,
      "faceId2" : idFace2
    }
    return this.http.post(this.urlVerify, bodyData, options)
      // .map(data => data.json());
  }

  createGroup(personGroupId, name) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': config.apiKeyMicrosoft
    });
    const options = new RequestOptions({ headers });
    // let personGroupId = personGroupId;
    let groupData = {
      "name": name,
      "userData": name
    }
    return this.http.put(this.urlGroup+personGroupId, groupData, options);

  }

}
