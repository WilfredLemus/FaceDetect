import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';
import { UserData } from '../../models/user';
import { FirebaseListObservable } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import { NewUsuarioPage } from "../new-usuario/new-usuario";

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  users: FirebaseListObservable<UserData[]>;
  loadding: boolean = true;
  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    this.users = this.userProvider.getUsers()
    this.users.subscribe(() => this.loadding = false);
  }

  NewUsuario() {
    this.navCtrl.push(NewUsuarioPage);
  }

  deleteConfirm(user: UserData) {
    let confirm = this.alertCtrl.create({
      title: 'Eliminar Usuario?',
      message: 'Esta seguro de eliminar a:  <b>'+user.name+'</b>?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteUser(user);
          }
        }
      ]
    });
    confirm.present();
  }

  deleteUser(user: UserData) {
    this.showToast('Usuario Eliminado', 'top');
    this.userProvider.deleteUser(user.$key);
  }

  showToast(message: string, position: string){
    let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: position
      });
    toast.present();
  }

}
