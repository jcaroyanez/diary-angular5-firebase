import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UsersService {

  //firedata = firebase.database().ref('/users');

  constructor(private _angularFireAuth:AngularFireAuth,private firebaseDb:AngularFireDatabase) { }

  addUsers(user:any){
    const promise = new Promise((resolve,reject) => {
      this._angularFireAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then((rest) => {
          this._angularFireAuth.auth.currentUser.updateProfile({
            displayName:user.name,
            photoURL:''
          }).then(() => {
              this._angularFireAuth.auth.currentUser.sendEmailVerification().then(() =>{
                    this.firebaseDb.database.ref('/users').child(this._angularFireAuth.auth.currentUser.uid).set({
                      uid:this._angularFireAuth.auth.currentUser.uid,
                      displayName:this._angularFireAuth.auth.currentUser.displayName,
                      photoURL:this._angularFireAuth.auth.currentUser.photoURL,
                      email:this._angularFireAuth.auth.currentUser.email
                    }).then(() => { resolve({success:true,message:'Registro exitoso'}) })
              })
          })
        }).catch(error => { reject(new Error(error.message)) })
   });
   return promise;
  }

}

