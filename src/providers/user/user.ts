import { Injectable } from '@angular/core';
import { UserData } from '../../models/user';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UserProvider {

  private basePath: string = '/Users';
  users: FirebaseListObservable<UserData[]> = null;
  user: FirebaseObjectObservable<UserData> = null;

  constructor(private afDB: AngularFireDatabase) { }

  getUsers(): FirebaseListObservable<UserData[]> {
    this.users = this.afDB.list(this.basePath);
    return this.users;
  }

  getUser(key: string): FirebaseObjectObservable<UserData> { 
    const userPath = `${this.basePath}/${key}`;
    this.user = this.afDB.object(userPath);
    return this.user;
  }

  createUser(user: UserData){
    return this.users.push(user).key;
      // .catch(err => console.log(err));
  }

  updateUser(key: string, value: any) {
    return this.users.update(key, value);
      // .catch(err => console.log(err));
  }

  // setUser(key: string, value: any) {
  //   return this.users.set(key, value);
  //     // .catch(err => console.log(err));
  // }
  
  deleteUser(key: string): void {
    this.users.remove(key)
      .catch(err => console.log(err));
  }
}
