import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { config } from '../../app/app.config';


@Injectable()
export class ApifaceProvider {

  private url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender';

  constructor(public http: Http) { }

  getDataImg(imageUrl) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': config.apiKeyMicrosoft
    });
    const options = new RequestOptions({ headers });

    return this.http.post(this.url,  {url: imageUrl}, options)
      .map(data => data.json());
  }

}
