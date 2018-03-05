import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  isAuthS = new BehaviorSubject<boolean>(true);
  stateUsers:boolean = true;

  constructor(private _angularFireAuth:AngularFireAuth) {
  }

  init(){
    this._angularFireAuth.authState.subscribe((data) => {
      if(data == null){
         this.isAuthS.next(false);
       }else{
         this.isAuthS.next(true);
       }
    });
    
    this.isAuthS.subscribe(data => {
      this.stateUsers = data;
    });
  }

  logIn(user:any){
    const promise = new Promise((resolve,reject) => {
    this._angularFireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email,user.password).then(() => {
       if(this._angularFireAuth.auth.currentUser.emailVerified){
         this.isAuthS.next(true);
         resolve({success:true});
       }else{
         resolve({success:false,message:"Correo sin verificar"});
       }
    }).catch((error) => {
      reject(new Error(error.message)); 
    });
   });
   return promise;
  }

  logout(){
    const promise = new Promise((resolve,reject) => {
        this._angularFireAuth.auth.signOut().then(() => {
            resolve({success:true});
        }).catch(error => {
          reject({success:false})
        })
    });
    this.isAuthS.next(false);

    return promise;
  }

  isAuth(){
    const promise = new Promise((resolve,reject) => {
      this._angularFireAuth.authState.subscribe((data) => {
        if(data == null){
           resolve({success:false});
        }else{
          resolve({success:true});
        }
      });
    });
    return promise;
  }

}
