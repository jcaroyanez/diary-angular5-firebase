import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContactService {

  eventNotify = new BehaviorSubject<any[]>([]);
  evenContacts = new BehaviorSubject<any[]>([]);
  userSendNotify: any;
  listNotification = [];
  listContacts = [];
  uid: any;

  constructor(private _angularFireDatabase: AngularFireDatabase, private _angularFireAuth: AngularFireAuth) { }

  add(contact: any) {
    const promise = new Promise((resolve, reject) => {
      this._angularFireDatabase.database.ref('/contact').child(this._angularFireAuth.auth.currentUser.uid).push({
        name: contact.name,
        email: contact.email,
        cel: contact.cel
      }).then(() => {
        this._angularFireDatabase.database.ref('/users').orderByChild('email').equalTo(contact.email).once('value', (snapshot) => {
          const contactAnotify = snapshot.val();
          if (contactAnotify) {
            for (var i in contactAnotify) {
              this.userSendNotify = contactAnotify[i];
            }
            this._angularFireDatabase.database.ref('/notifications').child(this.userSendNotify.uid).push({
              sentby: this._angularFireAuth.auth.currentUser.uid,
              message: this._angularFireAuth.auth.currentUser.displayName + " te a agreadodo a sus contactos",
              timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(() => {
              resolve({ success: true });
            });
          } else {
            resolve({ success: true });
          }
        });
      })
    });
    return promise;
  }

  getNotifycation() {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this._angularFireDatabase.database.ref('/notifications').child(user.uid).on('value', (datasnapshot) => {
          this.listNotification = [];
          const aux = datasnapshot.val();
          for (var key in aux) {
            const time = new Date(aux[key].timestamp);
            aux[key].time = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes();
            this.listNotification.push(aux[key]);
          }
          this.eventNotify.next(this.listNotification);
        });
      }
    });

  }

  getAllContacts() {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this._angularFireDatabase.database.ref('/contact').child(this._angularFireAuth.auth.currentUser.uid).on('value', (datasnapshot) => {
          this.listContacts = [];
          const aux = datasnapshot.val();
          for (var key in aux) {
            aux[key].uid = key;
            this.listContacts.push(aux[key]);
          }
          this.evenContacts.next(this.listContacts);
        });
      }
    });

  }

}
