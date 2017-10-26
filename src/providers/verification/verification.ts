import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';


@Injectable()
export class VerificationProvider {

  private basePath: string = '/Verifications';
  verifications: FirebaseListObservable<any>;
  verification: FirebaseObjectObservable<any>;

  constructor(private afDB: AngularFireDatabase) { 
    this.verifications = this.afDB.list(this.basePath);
  }

  getVerifications(): FirebaseListObservable<any> {
    return this.verifications;
  }

  getVerification(key: string): FirebaseObjectObservable<any> { 
    const userPath = `${this.basePath}/${key}`;
    this.verification = this.afDB.object(userPath);
    return this.verification;
  }


  createVerification($key, data){
    // let fecha = new Date()
    this.verifications = this.afDB.list(this.basePath+`/${$key}/`);
    // this.users = this.afDB.list(this.basePath);
    return this.verifications.push(data).key;
    // return this.verification.push(data);
  }

}
