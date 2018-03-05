import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthService {

  constructor(private _angularFireAuth:AngularFireAuth) { }

  logIn(user:any){
    const promise = new Promise((resolve,reject) => {
    this._angularFireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email,user.password).then(() => {
       if(this._angularFireAuth.auth.currentUser.emailVerified){
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
